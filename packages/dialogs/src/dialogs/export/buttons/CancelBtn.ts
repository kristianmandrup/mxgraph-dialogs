import { BaseDialogBtn } from "../../base/BaseDialogBtn";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class CancelBtn extends BaseDialogBtn {
  createBtn() {
    var cancelBtn = mxUtils.button(mxResources.get("cancel"), () => {
      this.ui.hideDialog();
    });
    cancelBtn.className = "geBtn";
    this.btn = cancelBtn;
    return cancelBtn;
  }
}
