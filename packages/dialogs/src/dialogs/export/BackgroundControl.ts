import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxConstants, mxUtils, mxResources } = mx;

export class BackgroundControl extends BaseControl {
  appendBackgroundDisplay(row) {
    const td = document.createElement("td");
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("background") + ":");

    row.appendChild(td);
    return row;
  }

  appendTransparentSelect(row) {
    const { graph } = this;

    const transparentCheckbox = document.createElement("input");
    transparentCheckbox.setAttribute("type", "checkbox");
    transparentCheckbox.checked =
      graph.background == null || graph.background == mxConstants.NONE;

    const td = document.createElement("td");
    td.appendChild(transparentCheckbox);
    mxUtils.write(td, mxResources.get("transparent"));

    row.appendChild(td);
    return row;
  }

  append() {
    const { tbody } = this;
    const row = document.createElement("tr");
    this.appendBackgroundDisplay(row);

    tbody.appendChild(row);
  }
}
