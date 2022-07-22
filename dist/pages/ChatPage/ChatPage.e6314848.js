// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lVfbH":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7041018ae6314848";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"kKNlY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _dialogsItem = require("../../components/DialogsItem/DialogsItem");
var _dialogsItemDefault = parcelHelpers.interopDefault(_dialogsItem);
var _message = require("../../components/Message/Message");
var _messageDefault = parcelHelpers.interopDefault(_message);
var _sendMessange = require("../../components/SendMessange/SendMessange");
var _sendMessangeDefault = parcelHelpers.interopDefault(_sendMessange);
var _userSetting = require("./modules/UserSetting/UserSetting");
var _userSettingDefault = parcelHelpers.interopDefault(_userSetting);
var _data = require("./data");
(function() {
    const MainContainer = document.querySelector(".chat__main");
    const chatContainer = document.querySelector(".chat__container");
    const userForm = [
        {
            name: "email",
            type: "text",
            placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u0447\u0442\u0443",
            title: "\u041F\u043E\u0447\u0442\u0430",
            value: "pochta@yandex.ru"
        },
        {
            name: "login",
            type: "text",
            placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u041B\u043E\u0433\u0438\u043D",
            title: "\u041B\u043E\u0433\u0438\u043D",
            value: "ivanivanov"
        },
        {
            name: "first-name",
            type: "text",
            placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F",
            title: "\u0418\u043C\u044F",
            value: "\u0418\u0432\u0430\u043D"
        },
        {
            name: "second-name",
            type: "text",
            placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0444\u0430\u043C\u0438\u043B\u0438\u044E",
            title: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F",
            value: "\u0418\u0432\u0430\u043D\u043E\u0432"
        },
        {
            name: "phone",
            type: "text",
            placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
            title: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
            value: "+7 (909) 967 30 30"
        },
        {
            name: "password",
            type: "password",
            placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u041F\u0430\u0440\u043E\u043B\u044C",
            title: "\u041F\u0430\u0440\u043E\u043B\u044C",
            value: "qwerty"
        }, 
    ];
    const openDialog = (index)=>{
        chatContainer.innerHTML = "";
        chatContainer.classList.add("chat__container--dialog");
        (0, _data.dialogs)?.[index].messages.forEach((item, index)=>{
            let div = document.createElement("div");
            div.className = "chat__messange";
            div.innerHTML = (0, _messageDefault.default)({
                ...item
            });
            chatContainer.prepend(div);
        });
        let div1 = document.createElement("div");
        div1.className = "chat__messange";
        div1.innerHTML = (0, _sendMessangeDefault.default)();
        chatContainer.append(div1);
    };
    const getUserSettings = ()=>{
        // ВЫВОД НАСТРОЕК ПОЛЬЗОВАТЕЛЯ
        MainContainer.innerHTML = "";
        let div = document.createElement("div");
        div.className = "chat__user-setting";
        div.innerHTML = (0, _userSettingDefault.default)({
            userForm
        });
        MainContainer.append(div);
    };
    const getContacts = ()=>{
        // ВЫВОД КОНТАКТОВ
        MainContainer.innerHTML = "\u0440\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F..";
    };
    const getSettings = ()=>{
        // ВЫВОД НАСТРОЕК ПРИЛОЖЕНИЯ
        MainContainer.innerHTML = "\u0440\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F..";
    };
    const getDialogs = ()=>{
        // ВЫВОД СПИСКА ДИАЛОГОЛОВ
        MainContainer.innerHTML = "";
        (0, _data.dialogs)?.forEach((item, index)=>{
            let div = document.createElement("div");
            div.innerHTML = (0, _dialogsItemDefault.default)({
                ...item,
                lastMessange: item.messages?.[0],
                openDialog: ()=>{
                    openDialog(index);
                }
            });
            MainContainer.append(div);
        });
    };
    const menuFunction = [
        getUserSettings,
        getDialogs,
        getContacts,
        getSettings
    ];
    const chatMenu = document.querySelector(".chat__menu");
    const chatMenuButton = document.querySelectorAll(".chat__icon");
    chatMenuButton.forEach((item, index)=>{
        item.addEventListener("click", ()=>{
            menuFunction[index]();
            chatMenu.className = `chat__menu chat__menu--active-${index}`;
        });
    });
    // при первом открытии показываю список чатов
    menuFunction[1]();
    // при первом открытии
    chatContainer.innerHTML = `<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>`;
//openDialog(0);
})();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../../components/DialogsItem/DialogsItem":"gK4QH","./data":"fPPM4","../../components/Message/Message":"cw81T","../../components/SendMessange/SendMessange":"39sG3","./modules/UserSetting/UserSetting":"9QOHt"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gK4QH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _templator = require("../../utils/Templator");
var _dialogsItemScss = require("./DialogsItem.scss");
const DialogsItem = (props)=>{
    const context = {
        first_name: props.first_name,
        id: props.id,
        link: props.link,
        photo: props.photo,
        unreadMessage: props.unreadMessage,
        lastMessange: props.lastMessange,
        openDialog: props.openDialog
    };
    const template = `
    <div class="dialogs-item" onClick={{openDialog}}>
    <img src={{photo}} alt="avatar" class="dialogs-item__photo"  />
    <div class="dialogs-item__text-container" >
        <p class="dialogs-item__name">{{first_name}}</p>
        <p class="dialogs-item__messange">{{lastMessange.text}}</p>
    </div>
   
    <span class="dialogs-item__number">{{unreadMessage}}</span>
    <span class="dialogs-item__time">10:49</span>
    </div>
  
  `;
    return (0, _templator.getTemplate)(template, context);
};
exports.default = DialogsItem;

},{"../../utils/Templator":"beJ1N","./DialogsItem.scss":"bP2W2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"beJ1N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getTemplate", ()=>getTemplate);
var _getObjectKey = require("./getObjectKey");
//НУЖНО НАПИСАТЬ ОБРАБОТКУ МАССИВОВ mas[0]
window.Templator = function() {
    class Templator {
        TEMPLATE_REGEXP = /\{\{(.*?)\}\}/i;
        constructor(template){
            this._template = template;
        }
        compile(ctx) {
            return this._compileTemplate(this._template, ctx);
        }
        _compileTemplate(template, ctx) {
            let tmpl = this._template;
            let key = null;
            const regExp = this.TEMPLATE_REGEXP;
            // Важно делать exec именно через константу, иначе уйдёте в бесконечный цикл
            while(key = regExp.exec(tmpl))if (key[1]) {
                const tmplValue = key[1].trim();
                const data = (0, _getObjectKey.getObjectKey)(ctx, tmplValue);
                if (typeof data === "function") {
                    /*
            баг. если название функции одинаковые, то они переопределяются.. 
            нужно подумать как с этим быть, но пока просто добавляю хеш
            */ const newFuncName = `${tmplValue}_${Math.floor(Math.random() * 500)}`;
                    window[newFuncName] = data;
                    tmpl = tmpl.replace(new RegExp(key[0], "gi"), `window.${newFuncName}()`);
                    continue;
                }
                tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
            }
            return tmpl;
        }
    }
    // Можно не только из window брать, но и присвоить экспорту файла
    return Templator;
}();
function getTemplate(template, context) {
    const tmpl = new window.Templator(template);
    return tmpl.compile(context); // Строка с html-вёрсткой
}

},{"./getObjectKey":"ezcL9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ezcL9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getObjectKey", ()=>getObjectKey);
function getObjectKey(obj, path, defaultValue) {
    let keys = path.split(".");
    let result = obj;
    for (let key of keys){
        result = result[key];
        if (result === undefined) return defaultValue;
    }
    return result ?? defaultValue;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bP2W2":[function() {},{}],"fPPM4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dialogs", ()=>dialogs);
// временный файл с тем, как предположительно будут приходить данные с бекенда
var _avatar1Png = require("../../../static/img/avatars/avatar1.png");
var _avatar1PngDefault = parcelHelpers.interopDefault(_avatar1Png);
var _avatar3Png = require("../../../static/img/avatars/avatar3.png");
var _avatar3PngDefault = parcelHelpers.interopDefault(_avatar3Png);
var _photoJpg = require("../../../static/img/avatars/photo.jpg");
var _photoJpgDefault = parcelHelpers.interopDefault(_photoJpg);
const dialogs = [
    {
        id: 1,
        photo: (0, _avatar1PngDefault.default),
        first_name: "\u041C\u0438\u043B\u0430\u043D\u0430",
        link: "/",
        unreadMessage: 2,
        messages: [
            {
                text: "\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E..",
                data: "10:15",
                flagRead: 0,
                flagSend: 1,
                myMes: 1
            },
            {
                text: `Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
                data: "10:10",
                flagRead: 1,
                flagSend: 1,
                myMes: 0
            },
            {
                text: "\u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439))",
                data: "10:05",
                flagRead: 1,
                flagSend: 1,
                myMes: 1
            },
            {
                text: "\u043F\u0440\u0438\u0432\u0435\u0442!",
                data: "10:00",
                flagRead: 1,
                flagSend: 1,
                myMes: 0
            }, 
        ]
    },
    {
        id: 3,
        photo: (0, _photoJpgDefault.default),
        first_name: "\u041E\u0447\u043D\u044C \u0434\u043B\u0438\u043D\u043D\u043E\u0435 \u0438\u043C\u044F, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043D\u0435 \u043F\u043E\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440",
        link: "/",
        unreadMessage: 0,
        messages: [
            {
                text: "\u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439))",
                data: "10:05",
                flagRead: 1,
                flagSend: 1,
                myMes: 1
            },
            {
                text: "\u043F\u0440\u0438\u0432\u0435\u0442!",
                data: "10:00",
                flagRead: 1,
                flagSend: 1,
                myMes: 0
            }, 
        ]
    },
    {
        id: 2,
        photo: (0, _avatar3PngDefault.default),
        first_name: "\u041B\u0435\u043D\u044F",
        link: "/",
        unreadMessage: 79,
        messages: [
            {
                text: "\u0431\u043B\u0430?",
                data: "10:05",
                flagRead: 1,
                flagSend: 1,
                myMes: 1
            },
            {
                text: "\u0431\u043B\u0430 \u0431\u043B\u0430 \u0431\u043B\u0430",
                data: "10:00",
                flagRead: 1,
                flagSend: 1,
                myMes: 0
            }, 
        ]
    }, 
];

},{"../../../static/img/avatars/avatar1.png":"c2UxN","../../../static/img/avatars/avatar3.png":"4gXpg","../../../static/img/avatars/photo.jpg":"5g8Je","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c2UxN":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("9Dwye") + "../../avatar1.2ca7a5d5.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"4gXpg":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("9Dwye") + "../../avatar3.6676c29a.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"5g8Je":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("9Dwye") + "../../photo.e3b357e3.jpg" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"cw81T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _templator = require("../../utils/Templator");
var _messageModuleScss = require("./Message.module.scss");
var _messageModuleScssDefault = parcelHelpers.interopDefault(_messageModuleScss);
const message = (props1)=>{
    const returnClass = (props)=>{
        return `${(0, _messageModuleScssDefault.default).message}  ${props.myMes ? (0, _messageModuleScssDefault.default)["message--my"] : ""}  ${props.flagRead ? (0, _messageModuleScssDefault.default)["message--read"] : ""} ${props.flagSend ? (0, _messageModuleScssDefault.default)["message--send"] : ""}`;
    };
    const context = {
        text: props1.text,
        data: props1.data,
        classes: (0, _messageModuleScssDefault.default),
        classMes: returnClass(props1)
    };
    const template = `
   <div class="{{classMes}}">
    <p class="{{classes.message__text}}" >
      {{text}}
      <span class="{{classes.message__data}}" >{{data}}</span>
    <p/>
   </div>

  `;
    return (0, _templator.getTemplate)(template, context);
};
exports.default = message;

},{"../../utils/Templator":"beJ1N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./Message.module.scss":"5JPeP"}],"5JPeP":[function(require,module,exports) {
module.exports["body"] = `oSqLca_body`;
module.exports["message--my"] = `oSqLca_message--my`;
module.exports["message__text"] = `oSqLca_message__text`;
module.exports["message__data"] = `oSqLca_message__data`;
module.exports["message"] = `oSqLca_message`;
module.exports["root"] = `oSqLca_root`;

},{}],"39sG3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _templator = require("../../utils/Templator");
var _sendMessangeModuleScss = require("./SendMessange.module.scss");
var _sendMessangeModuleScssDefault = parcelHelpers.interopDefault(_sendMessangeModuleScss);
var _clipPng = require("../../../static/img/icons/clip.png");
var _clipPngDefault = parcelHelpers.interopDefault(_clipPng);
var _sendMessangePng = require("../../../static/img/icons/send-messange.png");
var _sendMessangePngDefault = parcelHelpers.interopDefault(_sendMessangePng);
const SendMessange = ()=>{
    const context = {
        classes: (0, _sendMessangeModuleScssDefault.default),
        clip: (0, _clipPngDefault.default),
        sendMessangeIcon: (0, _sendMessangePngDefault.default)
    };
    const template = `
   <form class={{classes.send-messange}}>
    <button class={{classes.send-messange__img}}><img src={{clip}} /></button>
    <input class={{classes.send-messange__input}} placeholder="Сообщение" type="text" id="messange" name="messange" >
    <button class={{classes.send-messange__img}}><img src={{sendMessangeIcon}}  /></button>
   </form>

  `;
    return (0, _templator.getTemplate)(template, context);
};
exports.default = SendMessange;

},{"../../utils/Templator":"beJ1N","./SendMessange.module.scss":"aJgrR","../../../static/img/icons/clip.png":"cncjL","../../../static/img/icons/send-messange.png":"j8Dl4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aJgrR":[function(require,module,exports) {
module.exports["body"] = `I5cg2a_body`;
module.exports["root"] = `I5cg2a_root`;
module.exports["send-messange"] = `I5cg2a_send-messange`;
module.exports["send-messange__img"] = `I5cg2a_send-messange__img`;
module.exports["send-messange__input"] = `I5cg2a_send-messange__input`;

},{}],"cncjL":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("9Dwye") + "../../clip.9630bb32.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"j8Dl4":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("9Dwye") + "../../send-messange.a080967d.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"9QOHt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _templator = require("../../../../utils/Templator");
var _fieldInput = require("../../../../components/FieldInput/FieldInput");
var _fieldInputDefault = parcelHelpers.interopDefault(_fieldInput);
var _userSettingScss = require("./UserSetting.scss");
var _photoJpg = require("../../../../../static/img/avatars/photo.jpg");
var _photoJpgDefault = parcelHelpers.interopDefault(_photoJpg);
var _penPng = require("../../../../../static/img/icons/pen.png");
var _penPngDefault = parcelHelpers.interopDefault(_penPng);
const passwordForm = [
    {
        name: "prevPassword",
        type: "password",
        placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u041F\u0430\u0440\u043E\u043B\u044C",
        title: "\u0421\u0442\u0430\u0440\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"
    },
    {
        name: "newPassword",
        type: "password",
        placeholder: "\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u041F\u0430\u0440\u043E\u043B\u044C",
        title: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"
    },
    {
        name: "repeatPassword",
        type: "password",
        placeholder: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",
        title: "\u041F\u0430\u0440\u043E\u043B\u044C"
    }, 
];
const UserSetting = (props)=>{
    let flagActiveForm = false;
    let form1 = "";
    props.userForm.forEach((item, index)=>{
        form1 = form1 + (0, _fieldInputDefault.default)({
            ...item,
            disabled: true
        });
    });
    const changeUserDataForm = (event)=>{
        event.preventDefault();
        const formDom = document.querySelector(".user-setting__form");
        let form = "";
        props.userForm.forEach((item, index)=>{
            form = form + (0, _fieldInputDefault.default)({
                ...item
            });
        });
        form = form + `<button class="user-setting__button" > Сохранить </button>
    <button class="user-setting__button" >Отмена </button>`;
        console.log("form", form);
        formDom.innerHTML = form;
    };
    const changePassword = (event)=>{
        event.preventDefault();
        const formDom = document.querySelector(".user-setting__form");
        let form = "";
        passwordForm.forEach((item, index)=>{
            form = form + (0, _fieldInputDefault.default)({
                ...item
            });
        });
        form = form + `<button class="user-setting__button" > Сохранить </button>
    <button class="user-setting__button" >Отмена </button>`;
        console.log("form", form);
        formDom.innerHTML = form;
    };
    //console.log('form', form);
    const context = {
        photo: (0, _photoJpgDefault.default),
        pen: (0, _penPngDefault.default),
        form: form1,
        passwordForm,
        changeUserDataForm: ()=>{
            changeUserDataForm(event);
        },
        changePassword: ()=>{
            changePassword(event);
        }
    };
    const template = `
  <div class="user-setting" >
    <div class="user-setting__avatar-container" >
        <img src={{photo}} alt="avatar" class="user-setting__avatar" />
        <img src={{pen}} alt="изменить аватар" class="user-setting__icon" />
    </div>

    <form class="user-setting__form">
        {{form}}
        <button onClick={{changeUserDataForm}} class="user-setting__button" > Изменить данные </button>
        <button class="user-setting__button" onClick={{changePassword}}> Изменить пароль </button>
        <button class="user-setting__button user-setting__button--exit">Выйти </button>
   </form>
  </div>
   

  `;
    return (0, _templator.getTemplate)(template, context);
};
exports.default = UserSetting;

},{"../../../../../static/img/avatars/photo.jpg":"5g8Je","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../../../../utils/Templator":"beJ1N","../../../../../static/img/icons/pen.png":"2LrlS","../../../../components/FieldInput/FieldInput":"iEcxx","./UserSetting.scss":"AyukO"}],"2LrlS":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("9Dwye") + "../../pen.af272b33.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"iEcxx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _templator = require("../../utils/Templator");
var _fieldInputModuleScss = require("./FieldInput.module.scss");
var _fieldInputModuleScssDefault = parcelHelpers.interopDefault(_fieldInputModuleScss);
const FieldInput = (props)=>{
    const initValue = {
        value: props.value ? props.value : "",
        class: props.class ? `${(0, _fieldInputModuleScssDefault.default)["field-input__input"]} ${props.class}` : (0, _fieldInputModuleScssDefault.default)["field-input__input"],
        type: props.type,
        name: props.name,
        placeholder: props.placeholder ? props.placeholder : "",
        title: props.title ? `<p class="{{classes.field-input__title}} ">${props.title}</p>` : "",
        disabled: props.disabled ? `disabled= ${props.disabled}` : ""
    };
    console.log("props.disabled ", initValue);
    const context = {
        ...initValue,
        classes: (0, _fieldInputModuleScssDefault.default)
    };
    const template = `
   <div class={{classes.field-input}}> 
        <p class="{{classes.field-input__title}} ">{{title}}</p>
        <input class="{{class}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" {{disabled}} value="{{value}}" >
   </div>
  `;
    return (0, _templator.getTemplate)(template, context);
};
exports.default = FieldInput;

},{"../../utils/Templator":"beJ1N","./FieldInput.module.scss":"7lnGJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7lnGJ":[function(require,module,exports) {
module.exports["field-input"] = `oO4kea_field-input`;
module.exports["body"] = `oO4kea_body`;
module.exports["root"] = `oO4kea_root`;
module.exports["field-input__title"] = `oO4kea_field-input__title`;
module.exports["field-input__input"] = `oO4kea_field-input__input`;

},{}],"AyukO":[function() {},{}]},["lVfbH","kKNlY"], "kKNlY", "parcelRequire1ce6")

//# sourceMappingURL=ChatPage.e6314848.js.map
