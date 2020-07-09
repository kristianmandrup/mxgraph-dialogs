import { Preview } from "./preview/Preview";
import { BaseDialogBtn } from "packages/dialogs/src/dialogs/base";

export class BasePrintBtn extends BaseDialogBtn {
  preview: any;

  constructor(dialog: any) {
    super(dialog);
    this.preview = this.createPreview();
  }

  createPreview() {
    return new Preview(this.dialog);
  }
}
