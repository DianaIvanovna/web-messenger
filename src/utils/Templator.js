import { getObjectKey } from './getObjectKey';

window.Templator = (function () {
  class Templator {
    TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

    constructor(template) {
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
      while ((key = regExp.exec(tmpl))) {
        if (key[1]) {
          const tmplValue = key[1].trim();
          const data = getObjectKey(ctx, tmplValue);

          console.log('data', data);

          if (typeof data === 'function') {
            window[tmplValue] = data;

            console.log('window[tmplValue]', window[tmplValue]);
            tmpl = tmpl.replace(
              new RegExp(key[0], 'gi'),
              `window.${key[1].trim()}()`
            );
            continue;
          }

          tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
        }
      }

      return tmpl;
    }
  }

  // Можно не только из window брать, но и присвоить экспорту файла
  return Templator;
})();

export function getTemplate(template, context) {
  const tmpl = new window.Templator(template);

  return tmpl.compile(context); // Строка с html-вёрсткой
}
