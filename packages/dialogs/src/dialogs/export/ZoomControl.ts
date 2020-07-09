import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class ZoomControl extends BaseControl {
  appendZoomPercentageDisplay(row) {
    const td = this.createCell();
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("zoom") + " (%):");
    row.appendChild(td);
    return row;
  }

  appendZoomPercentageInput(row) {
    var zoomInput: any = document.createElement("input");
    zoomInput.setAttribute("type", "number");
    zoomInput.setAttribute("value", "100");
    zoomInput.style.width = "180px";

    const td = document.createElement("td");
    td.appendChild(zoomInput);
    row.appendChild(td);
    return row;
  }

  appendZoomRow() {
    const row = this.createRow();
    this.appendZoomPercentageDisplay(row);
    this.appendZoomPercentageInput(row);
    return this.appendRow(row);
  }
}
