import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class HeightControl extends BaseControl {
  get height() {
    const { bounds, scale } = this;
    return Math.ceil(bounds.height / scale);
  }

  appendHeightDisplay(row) {
    const td = this.createCell();
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("height") + ":");
    row.appendChild(td);
    return row;
  }

  appendHeightInput(row) {
    const { height } = this;
    var heightInput: any = this.createInput();
    heightInput.setAttribute("value", height);
    heightInput.style.width = "180px";

    const td = this.createCell();
    td.appendChild(heightInput);
    row.appendChild(td);
    return row;
  }

  appendHeight() {
    const row = this.createRow();
    this.appendHeightDisplay(row);
    this.appendHeightInput(row);
    return this.appendRow(row);
  }
}
