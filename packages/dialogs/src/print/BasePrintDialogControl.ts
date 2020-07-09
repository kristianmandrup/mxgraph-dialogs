import { BaseDialogControl } from "../dialogs/base";

export class BasePrintDialogControl extends BaseDialogControl {
  td: any;

  constructor(dialog, td) {
    super(dialog);
    this.td = td;
  }

  get pageCountCheckBox() {
    return this.dialog.pageCountCheckBox;
  }

  get onePageCheckBox() {
    return this.dialog.pageCountCheckBox;
  }
}
