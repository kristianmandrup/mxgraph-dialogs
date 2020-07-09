import mx from "@mxgraph-app/mx";
import { BaseDialogBtn } from "packages/dialogs/src/dialogs/base";
const { mxResources, mxUtils } = mx;

export class CancelBtn extends BaseDialogBtn {
  get cancelFn() {
    return this.dialog.validateFn;
  }

  createBtn() {
    const { ui, cancelFn } = this;
    var cancelBtn = mxUtils.button(mxResources.get("cancel"), function () {
      ui.hideDialog();

      if (cancelFn != null) {
        cancelFn();
      }
    });
    cancelBtn.className = "geBtn";
    this.btn = cancelBtn;
    return cancelBtn;
  }
}
