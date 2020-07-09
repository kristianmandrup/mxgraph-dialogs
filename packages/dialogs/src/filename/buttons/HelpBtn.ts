import mx from "@mxgraph-app/mx";
import { BaseDialogBtn } from "packages/dialogs/src/dialogs/base";
const { mxUtils, mxResources } = mx;

export class HelpBtn extends BaseDialogBtn {
  btn: any;

  get helpLink() {
    return "";
  }

  createBtn() {
    const { helpLink, ui } = this;
    if (!helpLink) return;
    var helpBtn = mxUtils.button(mxResources.get("help"), function () {
      ui.editor.graph.openLink(helpLink);
    });

    helpBtn.className = "geBtn";
    return helpBtn;
  }
}
