import mx from "@mxgraph-app/mx";
import { DialogButtons } from "../../dialogs/base";
const { mxUtils, mxResources } = mx;

export class PrintButtons extends DialogButtons {
  createCancelBtn() {
    const { ui } = this;
    var cancelBtn = mxUtils.button(mxResources.get("cancel"), function () {
      ui.hideDialog();
    });
    cancelBtn.className = "geBtn";
    this.cancelBtn = cancelBtn;
  }

  create() {
    const td = document.createElement("td");
    td.colSpan = 2;
    td.style.paddingTop = "20px";
    td.setAttribute("align", "right");

    this.appendAndLayoutButtons();
  }
}
