import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";
import { Dialog } from "../../dialog/Dialog";
const { mxEvent, mxClient, mxUtils, mxResources } = mx;
const { IMAGE_PATH } = resources;
/**
 * Constructs a new link dialog.
 */
export class LinkDialog {
  container: any; // HTMLElement;
  documentMode: any;

  mainDiv: any; // HTMLElement;
  linkInput: any; // HTMLInputElement;
  cross: any; // HTMLElement;
  inner: any; // HTMLElement;
  btns: any; // HTMLElement;
  cancelBtn: any; //HTMLButtonElement;
  mainBtn: any; //HTMLButtonElement;

  createMainDiv() {
    var div = document.createElement("div");
    mxUtils.write(div, mxResources.get("editLink") + ":");
    this.mainDiv = div;
    return div;
  }

  createInnerDiv() {
    var inner = document.createElement("div");
    inner.className = "geTitle";
    inner.style.backgroundColor = "transparent";
    inner.style.borderColor = "transparent";
    inner.style.whiteSpace = "nowrap";
    inner.style.textOverflow = "clip";
    inner.style.cursor = "default";
    this.inner = inner;

    if (!mxClient.IS_VML) {
      inner.style.paddingRight = "20px";
    }
    return inner;
  }

  createLinkInput() {
    const { initialValue } = this;
    var linkInput = document.createElement("input");
    linkInput.setAttribute("value", initialValue);
    linkInput.setAttribute("placeholder", "http://www.example.com/");
    linkInput.setAttribute("type", "text");
    linkInput.style.marginTop = "6px";
    linkInput.style.width = "400px";
    linkInput.style.backgroundImage =
      "url('" + Dialog.prototype.clearImage + "')";
    linkInput.style.backgroundRepeat = "no-repeat";
    linkInput.style.backgroundPosition = "100% 50%";
    linkInput.style.paddingRight = "14px";
    this.linkInput = linkInput;
    return linkInput;
  }

  createCross() {
    var cross = document.createElement("div");
    cross.setAttribute("title", mxResources.get("reset"));
    cross.style.position = "relative";
    cross.style.left = "-16px";
    cross.style.width = "12px";
    cross.style.height = "14px";
    cross.style.cursor = "pointer";
    this.cross = cross;

    // Workaround for inline-block not supported in IE
    cross.style.display = mxClient.IS_VML ? "inline" : "inline-block";
    cross.style.top = (mxClient.IS_VML ? 0 : 3) + "px";

    // Needed to block event transparency in IE
    cross.style.background = "url(" + IMAGE_PATH + "/transparent.gif)";
    this.cross = cross;
    return cross;
  }

  addCrossClickHandler() {
    const { linkInput, cross } = this;
    mxEvent.addListener(cross, "click", () => {
      linkInput.value = "";
      linkInput.focus();
    });
  }

  appendToInner(elem) {
    const { inner } = this;
    inner.appendChild(elem);
    return inner;
  }

  initialValue: any;

  init = () => {
    const { documentMode, linkInput } = this;
    linkInput.focus();

    if (
      mxClient.IS_GC ||
      mxClient.IS_FF ||
      documentMode >= 5 ||
      mxClient.IS_QUIRKS
    ) {
      linkInput.select();
    } else {
      document.execCommand("selectAll", false);
    }
  };

  createButtons() {
    var btns = document.createElement("div");
    btns.style.marginTop = "18px";
    btns.style.textAlign = "right";
    this.btns = btns;
    return btns;
  }

  createCancelBtn() {
    var cancelBtn = mxUtils.button(mxResources.get("cancel"), () => {
      this.editorUi.hideDialog();
    });
    cancelBtn.className = "geBtn";
    this.cancelBtn = cancelBtn;
    return cancelBtn;
  }

  editorUi: any;

  get cancelFirst() {
    return this.editorUi.editor.cancelFirst;
  }

  appendCancelBtn() {
    const { btns, cancelFirst } = this;
    const cancelBtn = this.createCancelBtn();

    if (cancelFirst) {
      btns.appendChild(cancelBtn);
    }
    return btns;
  }

  createMainBtn() {
    const { btnLabel, editorUi, linkInput, fn } = this;
    var mainBtn = mxUtils.button(btnLabel, function () {
      editorUi.hideDialog();
      fn(linkInput.value);
    });
    mainBtn.className = "geBtn gePrimaryBtn";
    this.mainBtn = mainBtn;
    return mainBtn;
  }

  appendBtns() {
    const { btns, cancelBtn, cancelFirst, createMainBtn } = this;
    const mainBtn = createMainBtn();
    btns.appendChild(mainBtn);
    if (!cancelFirst) {
      btns.appendChild(cancelBtn);
    }
  }

  btnLabel: string;
  fn: (val) => void;

  constructor(
    editorUi,
    initialValue,
    btnLabel,
    fn,
    { documentMode }: any = {}
  ) {
    this.editorUi = editorUi;
    this.fn = fn;
    this.btnLabel = btnLabel;
    this.documentMode = documentMode;
    this.initialValue = initialValue;

    const mainDiv = this.createMainDiv();
    const inner = this.createInnerDiv();
    const linkInput = this.createLinkInput();
    const cross = this.createCross();
    this.addCrossClickHandler();

    this.appendToInner(linkInput);
    this.appendToInner(cross);

    mainDiv.appendChild(inner);

    const btns = this.createButtons();

    mxEvent.addListener(linkInput, "keypress", function (e) {
      if (e.keyCode == 13) {
        editorUi.hideDialog();
        fn(linkInput.value);
      }
    });

    mainDiv.appendChild(btns);

    this.container = mainDiv;
  }
}
