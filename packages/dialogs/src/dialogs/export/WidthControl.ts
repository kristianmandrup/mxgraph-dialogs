import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class WidthControl extends BaseControl {
  get width() {
    const { bounds, scale } = this;
    return Math.ceil(bounds.width / scale);
  }

  appendWidthDisplay(row) {
    const td = this.createCell();
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("width") + ":");
    row.appendChild(td);
    return row;
  }

  appendWidthInput(row) {
    const { width } = this;
    var widthInput: any = document.createElement("input");
    widthInput.setAttribute("value", width);
    widthInput.style.width = "180px";

    const td = this.createCell();
    td.appendChild(widthInput);
    row.appendChild(td);
    return row;
  }

  appendWidth() {
    const row = this.createRow();
    this.appendWidthDisplay(row);
    this.appendWidthInput(row);
    return this.appendRow(row);
  }
}
