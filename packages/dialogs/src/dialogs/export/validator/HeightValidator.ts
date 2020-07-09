import { BaseValidator } from "./BaseValidator";
import resources from "@mxgraph-app/resources";
const { MAX_AREA } = resources;

export class HeightValidator extends BaseValidator {
  widthInput: any;
  constructor(inputElement, widthInput: any) {
    super(inputElement);
    this.widthInput = widthInput;
  }

  get isValid() {
    const { widthInput, inputElement } = this;
    return (
      widthInput.value * inputElement.value > MAX_AREA ||
      inputElement.value <= 0
    );
  }

  validate() {
    const { isValid, setInvalid, setValid } = this;
    isValid ? setInvalid() : setValid();
    return true;
  }
}
