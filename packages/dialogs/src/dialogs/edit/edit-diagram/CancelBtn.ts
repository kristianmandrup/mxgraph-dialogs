import mx from "@mxgraph-app/mx";
import { BaseDialogBtn } from "../../base";
const { mxUtils, mxResources } = mx;

export class CancelBtn extends BaseDialogBtn {
  get ui(): any {
    return this.dialog.ui;
  }

  createBtn() {
    const btn = mxUtils.button(mxResources.get("cancel"), () => {
      this.ui.hideDialog();
    });
    btn.className = "geBtn";
    this.btn = btn;
    return btn;
  }
}
