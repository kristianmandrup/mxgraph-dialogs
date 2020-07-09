import { HeightValidator } from "./HeightValidator";
import { WidthValidator } from "./WidthValidator";

interface InputOpts {
  widthInput: any;
  heightInput: any;
}

export class SizeValidator {
  widthInput: any;
  heightInput: any;

  heightValidator: HeightValidator;
  widthValidator: WidthValidator;

  constructor({ widthInput, heightInput }: InputOpts) {
    this.widthInput = widthInput;
    this.heightInput = heightInput;
    this.heightValidator = new HeightValidator(heightInput, widthInput);
    this.widthValidator = new WidthValidator(widthInput, heightInput);
  }

  validateWidth() {
    return this.widthValidator.validate();
  }

  validateHeight() {
    return this.heightValidator.validate();
  }

  validate = () => {
    this.validateWidth();
    this.validateHeight();
  };
}
