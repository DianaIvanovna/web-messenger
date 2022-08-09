/* eslint no-unused-vars: 0 */
export interface FormValidationInterface {
  _form: HTMLFormElement|null;
  _button: HTMLElement | null;
  _setHandlers():void;
  _removeHandlers():void;
  _formSubmission(event:EventTarget): void;
  _checkInputValidity(event:EventTarget): void;
  _resetError(event:EventTarget): void;
  _validateInputElement(element: EventTarget): boolean;
  _validateForm():void;
  _setSubmitButton(flag:boolean): void;
}
