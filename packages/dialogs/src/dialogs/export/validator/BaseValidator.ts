export class BaseValidator {
  inputElement: any;

  constructor(inputElement) {
    this.inputElement = inputElement;
  }

  setInvalid() {
    this.inputElement.style.backgroundColor = "red";
  }

  setValid() {
    this.inputElement.style.backgroundColor = "";
  }
}
