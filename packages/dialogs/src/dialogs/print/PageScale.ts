import mx from "@mxgraph-app/mx";
import { BasePrintDialogControl } from "./BasePrintDialogControl";
const { mxUtils, mxResources } = mx;

export class PageScale extends BasePrintDialogControl {
  label: any;
  inputWrapper: any;
  pageScaleInput: any;

  createPageScaleLabel() {
    const td = document.createElement("td");
    mxUtils.write(td, mxResources.get("pageScale") + ":");
    this.label = td;
    return td;
  }

  appendLabel() {
    const label = this.createPageScaleLabel();
    return this.appendRow(label);
  }

  appendInput() {
    const { inputWrapper, pageScaleInput } = this;
    inputWrapper.appendChild(pageScaleInput);
    return inputWrapper;
  }
}
