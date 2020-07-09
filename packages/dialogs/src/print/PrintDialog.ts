import { PageInputs } from "./PageInputs";

/**
 * Constructs a new print dialog.
 */
export class PrintDialog {
  container: any;

  inputs: PageInputs;

  static formats: any;
  static customSize: any;
  static currentPageFormat: any;
  static portraitCheckBox: any;
  static pageFormatListener: any;
  static formatDiv: any;
  static customDiv: any;
  static widthInput: any;
  static heightInput: any;
  static landscapeCheckBox: any;
  static paperSizeSelect: any;
  static pageFormat: any;
  static pf: any;

  /**
   * Specifies if the preview button should be enabled. Default is true.
   */
  static previewEnabled = true;

  editorUi: any;

  get graph() {
    return this.editorUi.editor.graph;
  }

  constructor(editorUi, title: string) {
    this.create(editorUi, title);
    this.inputs = new PageInputs(this);
  }

  table: any;

  createTable() {
    var table = document.createElement("table");
    table.style.width = "100%";
    table.style.height = "100%";
    this.table = table;
    return table;
  }

  tableBody: any;

  createTableBody() {
    var tbody = document.createElement("tbody");
    this.tableBody = tbody;
    return tbody;
  }

  appendOnePage(_row) {}

  /**
   * Constructs a new print dialog.
   */
  create(editorUi, _title) {
    this.editorUi = editorUi;
    var row, td;

    const table = this.createTable();
    const tbody = this.createTableBody();

    row = document.createElement("tr");
    this.appendOnePage(row);

    tbody.appendChild(row);

    row = row.cloneNode(false);

    row.appendChild(td);

    // row = row.cloneNode(false);
    const printBtn = {};

    td.appendChild(printBtn);

    row.appendChild(td);
    tbody.appendChild(row);

    table.appendChild(tbody);
    this.container = table;
  }
}
