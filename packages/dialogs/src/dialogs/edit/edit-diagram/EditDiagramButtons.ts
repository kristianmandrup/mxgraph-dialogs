import { DialogButtons } from "../../base";
import { EditDiagramDialog } from "./EditDiagramDialog";
import { CancelBtn } from "./CancelBtn";
import { OkBtn } from "./OkButton";

export class EditDiagramButtons extends DialogButtons {
  cancelBtn: any;
  okBtn: any;

  constructor(dialog: EditDiagramDialog) {
    super(dialog);
    this.okBtn = this.createOkBtn();
    this.cancelBtn = this.createCancelBtn();
  }

  createCancelBtn() {
    return new CancelBtn(this).btn;
  }

  createOkBtn() {
    return new OkBtn(this).btn;
  }
}
