import { BaseValidator } from "./BaseValidator";
import resources from "@mxgraph-app/resources";
const { MAX_AREA } = resources;

export class WidthValidator extends BaseValidator {
  heightInput: any;

  constructor(inputElement, heightInput: any) {
    super(inputElement);
    this.heightInput = heightInput;
  }

  get isValid() {
    const { heightInput, inputElement } = this;
    return (
      inputElement.value * heightInput.value > MAX_AREA ||
      inputElement.value <= 0
    );
  }

  validate() {
    const { isValid, setInvalid, setValid } = this;
    isValid ? setInvalid() : setValid();
    return true;
  }
}
