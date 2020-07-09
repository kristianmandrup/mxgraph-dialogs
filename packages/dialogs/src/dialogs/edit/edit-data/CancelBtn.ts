import mx from "@mxgraph-app/mx";
import { EditDataDialog } from "./EditDataDialog";
import { BaseBtn } from "./BaseBtn";
const { mxUtils, mxResources } = mx;

export class CancelBtn extends BaseBtn {
  btn: any;

  constructor(dialog: EditDataDialog) {
    super(dialog);
    this.createBtn();
    // this.configure();
  }

  createBtn() {
    var btn = mxUtils.button(mxResources.get("cancel"), () => {
      const { ui } = this;
      ui.hideDialog.apply(ui, arguments);
    });

    btn.className = "geBtn";
    this.btn = btn;
    return btn;
  }
}
