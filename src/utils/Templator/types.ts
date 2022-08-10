/* eslint no-unused-vars: 0 */
export interface TemplatorInterface {
  _template: string;
  compile(ctx:object):string;

  _compileTemplate(template:string, ctx:object):string;
}
