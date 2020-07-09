import mx from "@mxgraph-app/mx";
const { mxUtils } = mx;
import { BaseDialogControl } from "../base";

export class NameInputCtrl extends BaseDialogControl {
  nameInput: any;

  createNameInput() {
    const { noWrap, url, width, height } = this.dialog;
    var nameInput = document.createElement("textarea");

    if (noWrap) {
      nameInput.setAttribute("wrap", "off");
    }

    nameInput.setAttribute("spellcheck", "false");
    nameInput.setAttribute("autocorrect", "off");
    nameInput.setAttribute("autocomplete", "off");
    nameInput.setAttribute("autocapitalize", "off");

    mxUtils.write(nameInput, url || "");
    nameInput.style.resize = "none";
    nameInput.style.width = width + "px";
    nameInput.style.height = height + "px";
    this.nameInput = nameInput;
    return nameInput;
  }
}
