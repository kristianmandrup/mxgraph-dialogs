import { EditDataDialog } from "./EditDataDialog";

export class BaseBtn {
  dialog: EditDataDialog;
  addBtn: any;

  constructor(dialog: EditDataDialog) {
    this.dialog = dialog;
  }

  get graph(): any {
    return this.dialog.graph;
  }

  get cell(): any {
    return this.dialog.cell;
  }

  get ui(): any {
    return this.dialog.ui;
  }

  get id(): any {
    return this.dialog.id;
  }

  get nameInput(): any {
    return this.dialog.nameInput;
  }

  get names(): any {
    return this.dialog.names;
  }

  get texts(): any {
    return this.dialog.texts;
  }

  get value(): any {
    return this.dialog.value;
  }

  get form(): any {
    return this.dialog.form;
  }
}
