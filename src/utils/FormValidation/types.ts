/* eslint no-unused-vars: 0 */
export interface FormValidationInterface {
  _form: HTMLFormElement|null;
  _button: HTMLElement | null;
  _setHandlers():void;
  _removeHandlers():void;
  _formSubmission(event:Event): void;
  _checkInputValidity(event:Event): void;
  _resetError(event:Event): void;
  _validateInputElement(element: HTMLInputElement): boolean;
  _validateForm():void;
  _setSubmitButton(flag:boolean): void;
}
