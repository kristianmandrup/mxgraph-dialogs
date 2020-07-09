import { BaseDialogControl } from "./BaseDialogCtrl";

export class BaseDialogBtn extends BaseDialogControl {
  dialog: any;
  btn: any;

  constructor(dialog: any) {
    super(dialog);
    this.createBtn();
    this.configure();
  }

  createBtn() {}

  configure() {}
}
