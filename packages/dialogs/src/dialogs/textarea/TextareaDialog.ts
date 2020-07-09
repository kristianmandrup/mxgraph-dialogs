import mx from "@mxgraph-app/mx";
import { NameInputCtrl } from "./NameInputCtrl";
const { mxUtils } = mx;

/**
 * Constructs a new textarea dialog.
 */
export class TextareaDialog {
  editorUi: any;

  textarea: any; // HtmlTextAreaElement
  container: any; // HtmlElement

  title: string = "no title";
  url: string = "www.jgraph.com";
  height: number = 600;
  width: number = 400;
  noWrap: any;
  noHide: any;
  cancelFn?: () => void;
  cancelTitle: string = "cancel";
  addButtons: any;
  applyTitle: string = "apply";
  helpLink: string = "/help";
  customButtons: any;
  fn: any;

  createTitle() {
    const { title } = this;
    const td = document.createElement("td");
    td.style.fontSize = "10pt";
    td.style.width = "100px";
    mxUtils.write(td, title);
    return td;
  }

  nameInputCtrl: NameInputCtrl;

  init = () => {
    const { nameInput } = this;
    nameInput.focus();
    nameInput.scrollTop = 0;
  };

  get graph() {
    return this.editorUi.editor.graph;
  }

  get nameInput() {
    return this.nameInputCtrl.nameInput;
  }

  constructor(editorUi, opts: any = {}) {
    this.editorUi = editorUi;
    this.configure(opts);
    this.nameInputCtrl = new NameInputCtrl(this);

    var row, td;

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    row = document.createElement("tr");

    const title = this.createTitle();

    row.appendChild(title);
    tbody.appendChild(row);

    row = document.createElement("tr");

    const nameWrapper = document.createElement("td");

    const { nameInput } = this;
    this.textarea = nameInput;

    nameWrapper.appendChild(nameInput);
    row.appendChild(nameWrapper);

    tbody.appendChild(row);

    row = document.createElement("tr");

    // buttons

    row.appendChild(td);
    tbody.appendChild(row);
    table.appendChild(tbody);
    this.container = table;
  }

  configure(opts) {
    let {
      title,
      url,
      w,
      h,
      fn,
      noHide,
      noWrap,
      cancelFn,
      cancelTitle,
      addButtons,
      applyTitle,
      helpLink,
      customButtons,
    } = opts;
    w = w != null ? w : 300;
    h = h != null ? h : 120;
    noHide = noHide != null ? noHide : false;

    this.customButtons = customButtons;
    this.helpLink = helpLink;
    this.applyTitle = applyTitle;
    this.addButtons = addButtons;
    this.cancelTitle = cancelTitle;
    this.cancelFn = cancelFn;
    this.fn = fn;
    this.noHide = noHide;
    this.title = title;
    this.url = url;
    this.height = h;
    this.width = w;
    this.noWrap = noWrap;
  }
}
