import { ExportDialog } from "../ExportDialog";
import { SizeValidator } from "../validator/SizeValidator";

export class BaseChangeManager {
  dialog: ExportDialog;
  _sizeValidator: SizeValidator;

  constructor(dialog: ExportDialog) {
    this.dialog = dialog;
    this._sizeValidator = new SizeValidator(dialog.inputs.controls);
  }

  get controls() {
    return this.dialog.inputs.controls;
  }

  get size() {
    return this.dialog.size;
  }

  get sizeValidator() {
    return this._sizeValidator;
  }

  validateSize() {
    return this.sizeValidator.validate();
  }
}
