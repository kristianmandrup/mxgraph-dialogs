import { BaseControl } from "./BaseControl";
import { ImageFormatSelect } from "./ImageFormatSelect";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class FormatControl extends BaseControl {
  appendFormatRow() {
    const row = this.createRow();
    this.addFormat(row);
    const imageFormatSelect = new ImageFormatSelect().createSelect();
    const td = this.createCell();
    td.appendChild(imageFormatSelect);
    row.appendChild(td);
    return this.appendRow(row);
  }

  addFormat(row) {
    // format
    const td = this.createCell();
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("format") + ":");
    row.appendChild(td);
    return row;
  }
}
