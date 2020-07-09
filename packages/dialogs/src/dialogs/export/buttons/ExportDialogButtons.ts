import { ExportDialog } from "../ExportDialog";
import { SaveBtn } from "./SaveBtn";
import { CancelBtn } from "./CancelBtn";
import { BaseControl } from "../BaseControl";
import { DialogButtons } from "../../base";

export class ExportDialogButtons extends BaseControl {
  btnContainer: any;
  cancelBtn: any;
  saveBtn: any;

  buttons: DialogButtons;

  constructor(dialog: ExportDialog) {
    super(dialog);
    this.saveBtn = new SaveBtn(dialog);
    this.cancelBtn = new CancelBtn(dialog);
    this.buttons = new DialogButtons(
      dialog,
      this.btnContainer,
      this.cancelBtn,
      [this.saveBtn]
    );
  }

  createButtonsWrapper() {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("align", "right");
    td.style.paddingTop = "22px";
    td.colSpan = 2;
    row.appendChild(td);
    this.btnContainer = td;
    return row;
  }

  createRow() {
    const row = this.createButtonsWrapper();
    this.appendAndLayoutButtons();
    return this.appendRow(row);
  }

  appendAndLayoutButtons() {
    this.buttons.appendAndLayoutButtons();
  }
}
