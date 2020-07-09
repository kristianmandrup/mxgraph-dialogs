import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class NameControl extends BaseControl {
  nameInput?: HTMLInputElement;

  get getOrCreateFilename() {
    const { ui } = this;
    return ui.editor.getOrCreateFilename();
  }

  createNameInput() {
    // filename input
    var nameInput = document.createElement("input");
    nameInput.setAttribute("value", this.getOrCreateFilename());
    nameInput.style.width = "180px";
    this.nameInput = nameInput;
    return nameInput;
  }

  addFilenameCell(row) {
    const td = document.createElement("td");
    td.style.fontSize = "10pt";
    td.style.width = "100px";
    mxUtils.write(td, mxResources.get("filename") + ":");

    row.appendChild(td);
    return row;
  }

  addNameInput(row) {
    const nameInput = this.createNameInput();
    const td = this.createCell();
    td.appendChild(nameInput);
    row.appendChild(td);
    return row;
  }

  appendNameRow() {
    const row = this.createRow();
    this.addFilenameCell(row);
    this.addNameInput(row);
    return this.appendRow(row);
  }
}
