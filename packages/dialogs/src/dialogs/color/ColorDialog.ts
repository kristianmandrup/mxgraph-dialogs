import mx from "@mxgraph-app/mx";
const { mxEventObject, mxResources, mxEvent, mxUtils, mxClient } = mx;

import JsColor from "./JsColor";
import { defaults } from "./defaults";
import { ColorPresets, IPresetOpts } from "./ColorPresets";

/**
 * Constructs a new color dialog.
 */
export class ColorDialog {
  editorUi: any;
  container?: HTMLElement;

  center: any;
  picker: any;

  colorInput?: HTMLElement;
  input?: HTMLInputElement;
  mainDiv?: HTMLElement;

  table?: HTMLTableElement;
  buttons?: HTMLElement;
  cancelBtn?: HTMLButtonElement;
  applyBtn?: HTMLButtonElement;

  currentColorKey: any;

  createPicker(input, opts) {
    return new JsColor(input, opts);
  }

  get pickerBox() {
    return this.picker.box;
  }

  showPicker() {
    const { input, pickerPreset } = this;
    const picker = this.createPicker(input, { preset: pickerPreset });
    this.picker = picker;
    this.picker.show();
  }

  cancelFn: () => void;
  applyFn: () => void;

  defaultFns = {
    cancel: () => {},
    apply: undefined, // () => {},
  };

  createInput() {
    var input: any = document.createElement("input");
    this.input = input;
    input.style.marginBottom = "10px";
    input.style.width = "216px";
    // Required for picker to render in IE
    if (mxClient.IS_IE) {
      input.style.marginTop = "10px";
      document.body.appendChild(input);
    }

    return input;
  }

  // See: https://jscolor.com/docs/#doc-basic-usage
  // use presets?
  pickerPreset = {
    position: "relative",
    width: "230px",
    height: "100px",
    padding: "10px",
  };

  init = () => {
    const { input } = this;
    if (!mxClient.IS_TOUCH) {
      input && input.focus();
    }
  };

  createMainDiv() {
    var mainDiv = document.createElement("div");
    this.mainDiv = mainDiv;
    return mainDiv;
  }

  createTable() {
    const { presetColors } = this;

    // Adds presets
    var table = this.addPresets({ presets: presetColors });
    table.style.marginBottom = "8px";

    table = this.addPresets({ presets: this.defaultColors });
    table.style.marginBottom = "16px";
    this.table = table;
    return table;
  }

  get presetColors() {
    return this.colorPresets ? this.colorPresets.presetColors : [];
  }

  colorPresets?: ColorPresets;

  getColorPresets(opts: IPresetOpts) {
    this.colorPresets = this.colorPresets || new ColorPresets(this, opts);
    return this.colorPresets;
  }

  addPresets(opts: IPresetOpts): any {
    return new ColorPresets(this, opts).addPresets();
  }

  createButtons() {
    var buttons = document.createElement("div");
    buttons.style.textAlign = "right";
    buttons.style.whiteSpace = "nowrap";
    this.buttons = buttons;
    return buttons;
  }

  createCancelBtn() {
    const { editorUi, cancelFn } = this;
    var cancelBtn = mxUtils.button(mxResources.get("cancel"), function () {
      editorUi.hideDialog();

      if (cancelFn != null) {
        cancelFn();
      }
    });
    cancelBtn.className = "geBtn";
    this.cancelBtn = cancelBtn;
    return cancelBtn;
  }

  createApplyBtn() {
    const { applyFn, input, editorUi } = this;
    var applyFunction = applyFn != null ? applyFn : this.createApplyFunction();
    var applyBtn = mxUtils.button(mxResources.get("apply"), function () {
      var color = (input && input.value) || "gray";

      // Blocks any non-alphabetic chars in colors
      if (/(^#?[a-zA-Z0-9]*$)/.test(color)) {
        if (color != "none" && color.charAt(0) != "#") {
          color = "#" + color;
        }

        ColorDialog.addRecentColor(
          color != "none" ? color.substring(1) : color,
          12
        );
        applyFunction(color);
        editorUi.hideDialog();
      } else {
        editorUi.handleError({ message: mxResources.get("invalidInput") });
      }
    });
    applyBtn.className = "geBtn gePrimaryBtn";
    this.applyBtn = applyBtn;
    return applyBtn;
  }

  get editor() {
    return this.editorUi.editor;
  }

  get cancelFirst() {
    return this.editor.cancelFirst;
  }

  layoutButtons() {
    const { cancelFirst } = this;
    const buttons = this.createButtons();
    const cancelBtn = this.createCancelBtn();

    if (cancelFirst) {
      buttons.appendChild(cancelBtn);
    }

    const applyBtn = this.createApplyBtn();
    buttons.appendChild(applyBtn);

    if (!cancelFirst) {
      buttons.appendChild(cancelBtn);
    }
  }

  setPickerColor() {
    const { picker, color, input } = this;
    if (color != null) {
      if (color == "none") {
        picker.fromString("ffffff");
        input && (input.value = "none");
      } else {
        picker.fromString(color);
      }
    }
  }

  color: string;

  constructor(editorUi, color?, applyFn?, cancelFn?) {
    this.editorUi = editorUi;
    this.color = color;
    const { defaultFns } = this;
    this.cancelFn = cancelFn || defaultFns.cancel;
    this.applyFn = applyFn || defaultFns.apply;
    const input = this.createInput();
    this.showPicker();

    const mainDiv = this.createMainDiv();
    mainDiv.appendChild(this.pickerBox);

    var center: any = document.createElement("center");
    this.center = center;

    mainDiv.appendChild(input);
    mxUtils.br(mainDiv);

    // Adds recent colors
    this.createRecentColorTable();

    this.createTable();

    mainDiv.appendChild(center);

    this.setPickerColor();

    const buttons: any = this.buttons;
    mainDiv.appendChild(buttons);
    this.colorInput = input;

    this.addKeyDownListener();
    this.container = mainDiv;
  }

  addKeyDownListener() {
    const { mainDiv, editorUi, cancelFn } = this;
    // LATER: Only fires if input if focused, should always
    // fire if this dialog is showing.
    mxEvent.addListener(mainDiv, "keydown", function (e) {
      if (e.keyCode == 27) {
        editorUi.hideDialog();

        if (cancelFn != null) {
          cancelFn();
        }

        mxEvent.consume(e);
      }
    });
  }

  get recentColors() {
    return ColorDialog.recentColors || [];
  }

  get recentPresets() {
    const { recentColors } = this;
    return recentColors.length == 0 ? ["FFFFFF"] : recentColors;
  }

  createRecentColorTable() {
    const presets = this.recentPresets;
    var table = this.addPresets({
      presets,
      rowLength: 11,
      defaultColor: "FFFFFF",
      addResetOption: true,
    });
    table.style.marginBottom = "8px";
    return table;
  }

  /**
   * Creates function to apply value
   */
  defaultColors = defaults.colors;

  /**
   * Creates function to apply value
   */
  createApplyFunction() {
    return (color) => {
      var graph = this.editorUi.editor.graph;

      graph.getModel().beginUpdate();
      try {
        graph.setCellStyles(this.currentColorKey, color);
        this.editorUi.fireEvent(
          new mxEventObject(
            "styleChanged",
            "keys",
            [this.currentColorKey],
            "values",
            [color],
            "cells",
            graph.getSelectionCells()
          )
        );
      } finally {
        graph.getModel().endUpdate();
      }
    };
  }

  static resetRecentColors = () => {
    ColorDialog.recentColors = [];
  };

  /**
   *
   */
  static recentColors: string[] = [];

  /**
   * Adds recent color for later use.
   */
  static addRecentColor(color: string, max: number) {
    if (color) {
      mxUtils.remove(color, ColorDialog.recentColors);
      ColorDialog.recentColors.splice(0, 0, color);

      if (ColorDialog.recentColors.length >= max) {
        ColorDialog.recentColors.pop();
      }
    }
  }
}
