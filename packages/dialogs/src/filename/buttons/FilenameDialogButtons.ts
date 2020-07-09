import { DialogButtons } from "../../dialogs/base";

export class FilenameDialogButtons extends DialogButtons {
  genericBtn: any;

  createBtns() {
    // const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 2;
    td.style.paddingTop = "20px";
    td.style.whiteSpace = "nowrap";
    td.setAttribute("align", "right");
    return td;
  }

  appendAndLayoutButtons() {
    // const { btns, cancelFirst, cancelBtn } = this;
    // if (cancelFirst) {
    //   btns.appendChild(cancelBtn);
    // }
    // btns.appendChild(genericBtn);
    // if (!cancelFirst) {
    //   btns.appendChild(cancelBtn);
    // }
  }
}
