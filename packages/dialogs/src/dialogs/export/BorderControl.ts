import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class BackgroundControl extends BaseControl {
  static lastBorderValue = 0;

  get lastBorderValue() {
    return BackgroundControl.lastBorderValue;
  }

  appendBorderDisplay(row) {
    const td = this.createCell();
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("borderWidth") + ":");
    return this.appendCell(row, td);
  }

  appendBorderInput(row) {
    var borderInput = document.createElement("input");
    borderInput.setAttribute("type", "number");
    borderInput.setAttribute("value", "" + this.lastBorderValue);
    borderInput.style.width = "180px";

    const td = this.createCell();
    td.appendChild(borderInput);
    return this.appendCell(row, td);
  }

  append() {
    const row = this.createRow();

    return this.appendRow(row);
  }
}
