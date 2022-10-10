import Route from './Route';

type routesItem={
  route: Route,
  protection:()=>boolean
}

type protectionFunc = ()=>boolean;

class Router {
  static __instance: any;

  routes: routesItem[];

  history: History;

  private _currentRoute: routesItem|null;

  private _rootQuery:string;

  private _defaultRoute: routesItem|null;

  constructor(rootQuery:string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  protectionDefault() {
    return true;
  }

  public use(pathname:string, block:any, protection?:protectionFunc) {
    const protectionItem = protection || this.protectionDefault;
    if (pathname === '*') {
      const route:Route = new Route(pathname, block, { rootQuery: this._rootQuery });
      this._defaultRoute = {
        route,
        protection: protectionItem,
      };
    } else {
      const route:Route = new Route(pathname, block, { rootQuery: this._rootQuery });

      this.routes.push({
        route,
        protection: protectionItem,
      });
    }

    return this;
  }

  public start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event:PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname:string) {
    let routeItem = this.getRoute(pathname) || this._defaultRoute;
    // простая защита роута
    if (routeItem && !routeItem.protection()) {
      routeItem = this.getRoute('/') || this._defaultRoute;
    }

    if (!routeItem || !routeItem.route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.route.leave();
    }

    this._currentRoute = routeItem;
    routeItem.route.render();
  }

  public go(pathname:string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname:string):routesItem|undefined {
    return this.routes.find((item) => item.route.match(pathname));
  }
}

export default Router;
