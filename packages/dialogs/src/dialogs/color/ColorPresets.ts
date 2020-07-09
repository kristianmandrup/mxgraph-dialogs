import { ColorDialog } from "./ColorDialog";
import { defaults } from "./defaults";
import { Dialog } from "../../dialog/Dialog";
import mx from "@mxgraph-app/mx";
const { mxResources, mxEvent } = mx;

export interface IPresetOpts {
  presets: string[];
  rowLength?: number;
  defaultColor?: string;
  addResetOption?: any;
}

export class ColorPresets {
  dialog: ColorDialog;
  table?: HTMLTableElement;
  tbody?: HTMLElement;

  constructor(dialog: ColorDialog, opts: IPresetOpts) {
    this.dialog = dialog;
    const { presets, rowLength, defaultColor, addResetOption } = opts;
    this.presets = presets;
    this.rowLength = rowLength || 12;
    this.defaultColor = defaultColor || "gray";
    this.addResetOption = addResetOption;
  }

  get picker() {
    return this.dialog.picker;
  }

  createTable() {
    var table: any = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.setAttribute("cellspacing", "0");
    table.style.marginBottom = "20px";
    table.style.cellSpacing = "0px";
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    this.tbody = tbody;
    this.table = table;
    return table;
  }

  createCell() {
    var td = document.createElement("td");
    td.style.border = "1px solid black";
    td.style.padding = "0px";
    td.style.width = "16px";
    td.style.height = "16px";
    return td;
  }

  get noColorImage() {
    return Dialog.prototype.noColorImage;
  }

  addToRow = (tr, clr) => {
    const { defaultColor } = this;
    var td = this.createCell();

    if (clr == null) {
      clr = defaultColor;
    }

    if (clr == "none") {
      td.style.background = "url('" + this.noColorImage + "')";
    } else {
      td.style.backgroundColor = "#" + clr;
    }

    tr.appendChild(td);

    if (clr != null) {
      td.style.cursor = "pointer";

      const { picker, input } = this.dialog;
      mxEvent.addListener(td, "click", function () {
        if (clr == "none") {
          picker.fromString("ffffff");
          input && (input.value = "none");
        } else {
          picker.fromString(clr);
        }
      });
    }
    this.addResetBtn(tr);
  };

  addTableRows(rowLength) {
    const { presets } = this;
    rowLength = rowLength != null ? rowLength : 12;
    var rows = presets.length / rowLength;

    for (var row = 0; row < rows; row++) {
      var tr: any = document.createElement("tr");

      for (var i = 0; i < rowLength; i++) {
        this.addToRow(tr, presets[row * rowLength + i]);
      }

      const { tbody } = this;
      tbody && tbody.appendChild(tr);
    }
  }

  createRecentColorTable() {
    return this.dialog.createRecentColorTable();
  }

  addResetBtn(tr) {
    const { addResetOption } = this;
    const table: any = this.table;
    if (addResetOption) {
      var td = this.createResetCell();
      tr.appendChild(td);

      mxEvent.addListener(td, "click", () => {
        ColorDialog.resetRecentColors();
        table.parentNode.replaceChild(this.createRecentColorTable(), table);
      });
    }
  }

  createResetCell() {
    var td = document.createElement("td");
    td.setAttribute("title", mxResources.get("reset"));
    td.style.border = "1px solid black";
    td.style.padding = "0px";
    td.style.width = "16px";
    td.style.height = "16px";
    td.style.backgroundImage = "url('" + Dialog.prototype.closeImage + "')";
    td.style.backgroundPosition = "center center";
    td.style.backgroundRepeat = "no-repeat";
    td.style.cursor = "pointer";
    return td;
  }

  presets: any;
  defaultColor: string = "gray";
  rowLength: number = 12;
  addResetOption: any;

  addPresets() {
    this.addTableRows(this.rowLength);
    const { center, table } = this.dialog;
    center.appendChild(table);
    return table;
  }

  /**
   * Creates function to apply value
   */
  presetColors = defaults.presetColors;
}
