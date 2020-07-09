export class BaseDialogControl {
  dialog: any;
  tbody: any;

  constructor(dialog: any, tbody?) {
    this.dialog = dialog;
    this.tbody = tbody || document.createElement("tbody");
  }

  get graph() {
    return this.dialog.graph;
  }

  get ui() {
    return this.dialog.ui;
  }

  createRow() {
    return document.createElement("tr");
  }

  createCell() {
    return document.createElement("td");
  }

  createInput() {
    return document.createElement("input");
  }

  appendRow(row) {
    const { tbody } = this;
    tbody.appendChild(row);
    return tbody;
  }

  appendCell(row, td) {
    row.appendChild(td);
    return row;
  }
}
