export class PageInputs {
  dialog: any;

  pageCountCheckBox: any;
  pageScaleInput: any;
  pageCountInput: any;
  onePageCheckBox: any;

  constructor(dialog: any) {
    this.dialog = dialog;
    this.createInputs();
  }

  createInputs() {
    this.createPageCountInput();
    this.createPageScaleInput();
    this.createPageCountCheckBox();
    this.createOnePageCheckBox();
  }

  createOnePageCheckBox() {
    var onePageCheckBox = document.createElement("input");
    onePageCheckBox.setAttribute("type", "checkbox");
    this.onePageCheckBox = onePageCheckBox;
    return onePageCheckBox;
  }

  createPageCountInput() {
    var pageCountInput = document.createElement("input");
    pageCountInput.setAttribute("value", "1");
    pageCountInput.setAttribute("type", "number");
    pageCountInput.setAttribute("min", "1");
    pageCountInput.setAttribute("size", "4");
    pageCountInput.setAttribute("disabled", "disabled");
    pageCountInput.style.width = "50px";
    this.pageCountInput = pageCountInput;
    return pageCountInput;
  }

  createPageScaleInput() {
    var pageScaleInput = document.createElement("input");
    pageScaleInput.setAttribute("value", "100 %");
    pageScaleInput.setAttribute("size", "5");
    pageScaleInput.style.width = "50px";
    this.pageScaleInput = pageScaleInput;
    return pageScaleInput;
  }

  createPageCountCheckBox() {
    var pageCountCheckBox = document.createElement("input");
    pageCountCheckBox.setAttribute("type", "checkbox");
    this.pageCountCheckBox = pageCountCheckBox;
    return pageCountCheckBox;
  }
}
