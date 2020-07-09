import mx from "@mxgraph-app/mx";
import { RemoveBtn } from "./RemoveBtn";
import { AddBtn } from "./AddBtn";
import { CancelBtn } from "./CancelBtn";
import { ApplyBtn } from "./ApplyBtn";
const { mxEvent, mxForm, mxClient, mxUtils, mxResources } = mx;

/**
 * Constructs a new metadata dialog.
 */
export class EditDataDialog {
  container?: HTMLElement;

  helpImage: any; // Editor.helpImage
  addBtn: any;

  nameInput?: HTMLInputElement;

  // init: () => void;

  updateAddBtn = () => {
    const { addBtn, nameInput } = this;
    if (nameInput && nameInput.value.length > 0) {
      addBtn.removeAttribute("disabled");
    } else {
      addBtn.setAttribute("disabled", "disabled");
    }
  };

  names: any[] = [];
  texts: any[] = [];
  count: number = 0;

  get id(): string | null {
    const { ui, cell } = this;
    return EditDataDialog.getDisplayIdForCell != null
      ? EditDataDialog.getDisplayIdForCell(ui, cell)
      : null;
  }

  div?: HTMLDivElement;

  createMainDiv() {
    var div = document.createElement("div");
    this.div = div;
    return div;
  }

  ui: any;
  cell: any;

  get graph() {
    return this.ui.editor.graph;
  }

  protected _value: any;

  get value() {
    this._value = this._value || this.graph.getModel().getValue(this.cell);
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  addTextArea = (index, name, value) => {
    const { names, texts, form, count, addRemoveButton } = this;
    names[index] = name;
    texts[index] = form && form.addTextarea(names[count] + ":", value, 2);
    texts[index].style.width = "100%";

    if (value.indexOf("\n") > 0) {
      texts[index].setAttribute("rows", "2");
    }

    addRemoveButton(texts[index], name);
  };

  addRemoveButton(text, name) {
    return new RemoveBtn(this).addRemoveButton(text, name);
  }

  temp: any[] = [];

  form?: HTMLFormElement;

  createForm() {
    var form: any = new mxForm("properties");
    form.table.style.width = "100%";
    this.form = form;
    return form;
  }

  valueToXml(value) {
    // Converts the value to an XML node
    if (!mxUtils.isNode(value, null)) {
      var doc = mxUtils.createXmlDocument();
      var obj = doc.createElement("object");
      obj.setAttribute("label", value || "");
      this.value = obj;
    }
  }

  get attrs() {
    return this.value.attributes;
  }

  get isLayer() {
    const { graph, cell } = this;
    return graph.getModel().getParent(cell) == graph.getModel().getRoot();
  }

  sortByName() {
    // Sorts by name
    this.temp.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  createText() {
    const { id, form } = this;
    if (!id) return;
    var text = document.createElement("div");
    text.style.width = "100%";
    text.style.fontSize = "11px";
    text.style.textAlign = "center";
    mxUtils.write(text, id);

    form && form.addField(mxResources.get("id") + ":", text);
  }

  addTextAreas() {
    let { temp, count } = this;
    for (var i = 0; i < temp.length; i++) {
      this.addTextArea(count, temp[i].name, temp[i].value);
      count++;
    }
  }

  init = () => {
    const { nameInput, texts } = this;
    if (texts.length > 0) {
      texts[0].focus();
    } else {
      nameInput && nameInput.focus();
    }
  };

  createNameInput() {
    var nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", mxResources.get("enterPropertyName"));
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute(
      "size",
      mxClient.IS_IE || mxClient.IS_IE11 ? "36" : "40"
    );
    nameInput.style.boxSizing = "border-box";
    nameInput.style.marginLeft = "2px";
    nameInput.style.width = "100%";
    this.nameInput = nameInput;
    return nameInput;
  }

  populateTemp() {
    const { temp } = this;
    const { attrs, isLayer } = this;
    for (var i = 0; i < attrs.length; i++) {
      if (
        (isLayer || attrs[i].nodeName != "label") &&
        attrs[i].nodeName != "placeholders"
      ) {
        temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
      }
    }
  }

  newProp?: HTMLDivElement;

  createNewProp() {
    var newProp = document.createElement("div");
    newProp.style.boxSizing = "border-box";
    newProp.style.paddingRight = "160px";
    newProp.style.whiteSpace = "nowrap";
    newProp.style.marginTop = "6px";
    newProp.style.width = "100%";
    this.newProp = newProp;
    return newProp;
  }

  applyBtn: any;
  cancelBtn: any;

  createCancelBtn() {
    this.cancelBtn = this.cancelBtn || new CancelBtn(this).btn;
    return this.cancelBtn;
  }

  createApplyBtn() {
    this.applyBtn = this.applyBtn || new ApplyBtn(this).btn;
    return this.applyBtn;
  }

  constructor(ui, cell) {
    this.ui = ui;
    this.cell = cell;
    const div = this.createMainDiv();
    const { value } = this;

    this.valueToXml(value);
    // Creates the dialog contents
    const form = this.createForm();
    const nameInput = this.createNameInput();
    this.populateTemp();

    this.sortByName();
    this.addTextAreas();

    var top = document.createElement("div");
    top.style.cssText =
      "position:absolute;left:30px;right:30px;overflow-y:auto;top:30px;bottom:80px;";
    top.appendChild(form.table);

    const newProp = this.createNewProp();

    newProp.appendChild(nameInput);
    top.appendChild(newProp);

    const { updateAddBtn } = this;
    div.appendChild(top);

    const { addBtn } = new AddBtn(this);
    newProp.appendChild(addBtn);

    this.createCancelBtn();
    this.createApplyBtn();

    mxEvent.addListener(nameInput, "keyup", updateAddBtn);

    // Catches all changes that don't fire a keyup (such as paste via mouse)
    mxEvent.addListener(nameInput, "change", updateAddBtn);

    this.createButtons();
    this.configureForVertexOrEdgeCell();

    const { cancelBtn, applyBtn, buttons } = this;

    if (ui.editor.cancelFirst) {
      buttons.appendChild(cancelBtn);
      buttons.appendChild(applyBtn);
    } else {
      buttons.appendChild(applyBtn);
      buttons.appendChild(cancelBtn);
    }

    div.appendChild(buttons);
    this.container = div;
  }

  buttons: any;

  createButtons() {
    var buttons = document.createElement("div");
    buttons.style.cssText =
      "position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;";
    this.buttons = buttons;
    return buttons;
  }

  configureForVertexOrEdgeCell() {
    const { cell, ui, value, buttons } = this;
    if (
      ui.editor.graph.getModel().isVertex(cell) ||
      ui.editor.graph.getModel().isEdge(cell)
    ) {
      var replace = document.createElement("span");
      replace.style.marginRight = "10px";
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.style.marginRight = "6px";

      if (value.getAttribute("placeholders") == "1") {
        input.setAttribute("checked", "checked");
        input.defaultChecked = true;
      }

      mxEvent.addListener(input, "click", function () {
        if (value.getAttribute("placeholders") == "1") {
          value.removeAttribute("placeholders");
        } else {
          value.setAttribute("placeholders", "1");
        }
      });

      replace.appendChild(input);
      mxUtils.write(replace, mxResources.get("placeholders"));

      if (EditDataDialog.placeholderHelpLink != null) {
        const link = this.createLink();
        const icon = this.createIcon();
        link.appendChild(icon);

        replace.appendChild(link);
      }

      buttons.appendChild(replace);
    }
  }

  link: any;
  icon: any;

  get placeholderHelpLink() {
    return EditDataDialog.placeholderHelpLink;
  }

  createIcon() {
    var icon = document.createElement("img");
    mxUtils.setOpacity(icon, 50);
    icon.style.height = "16px";
    icon.style.width = "16px";
    icon.setAttribute("border", "0");
    icon.setAttribute("valign", "middle");
    icon.style.marginTop = mxClient.IS_IE11 ? "0px" : "-4px";
    icon.setAttribute("src", this.helpImage);
    this.icon = icon;
    return icon;
  }

  createLink() {
    const { placeholderHelpLink } = this;
    var link = document.createElement("a");
    link.setAttribute("href", placeholderHelpLink);
    link.setAttribute("title", mxResources.get("help"));
    link.setAttribute("target", "_blank");
    link.style.marginLeft = "8px";
    link.style.cursor = "help";
    this.link = link;
    return link;
  }

  /**
   * Optional help link.
   */
  static getDisplayIdForCell = function (ui, cell) {
    var id = null;

    if (ui.editor.graph.getModel().getParent(cell) != null) {
      id = cell.getId();
    }

    return id;
  };

  /**
   * Optional help link.
   */
  static placeholderHelpLink: any = null;
}
