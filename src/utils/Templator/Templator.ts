import { getObjectKey } from './getObjectKey';
import { TemplatorInterface } from './types';

/* TODOS:
  - дописать обработку массивов mas[0]
  - баг. если название функции одинаковые, то они переопределяются.
*/

class Templator implements TemplatorInterface {
  TEMPLATE_REGEXP = /\{\{(.*?)\}\}/i;

  _template;

  constructor(template:string) {
    this._template = template;
  }

  compile(ctx:object) {
    return this._compileTemplate(this._template, ctx);
  }

  _compileTemplate(template:string, ctx:object) {
    let tmpl = template;
    let key: RegExpExecArray|null = null;
    const regExp = this.TEMPLATE_REGEXP;

    /* eslint no-cond-assign: 0 */
    /* eslint no-continue: 0 */
    while (key = regExp.exec(tmpl)) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = getObjectKey(ctx, tmplValue);

        if (typeof data === 'function') {
          /*
            баг. если название функции одинаковые, то они переопределяются..
            нужно подумать как с этим быть, но пока просто добавляю хеш
          */
          const newFuncName:string = `${tmplValue}_${Math.floor(Math.random() * 500)}`;

          (<any>window)[newFuncName] = data;

          tmpl = tmpl.replace(
            new RegExp(key[0], 'gi'),
            `window.${newFuncName}()`,
          );

          continue;
        }

        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data.toString());
      }
    }

    return tmpl;
  }
}

export function getTemplate(template:string, context:object) {
  const tmpl = new Templator(template);

  return tmpl.compile(context); // Строка с html-вёрсткой
}
