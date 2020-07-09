import { BaseDialogControl } from "../../base";
import mx from "@mxgraph-app/mx";
const { mxUtils } = mx;

export class TextArea extends BaseDialogControl {
  textarea: any;

  get getGraphXml() {
    return this.ui.editor.getGraphXml();
  }

  createTextArea() {
    const { getGraphXml } = this;
    var textarea: any = document.createElement("textarea");
    textarea.setAttribute("wrap", "off");
    textarea.setAttribute("spellcheck", "false");
    textarea.setAttribute("autocorrect", "off");
    textarea.setAttribute("autocomplete", "off");
    textarea.setAttribute("autocapitalize", "off");
    textarea.style.overflow = "auto";
    textarea.style.resize = "none";
    textarea.style.width = "600px";
    textarea.style.height = "360px";
    textarea.style.marginBottom = "16px";

    textarea.value = mxUtils.getPrettyXml(getGraphXml);
    this.textarea = textarea;
    return textarea;
  }
}
