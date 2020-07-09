/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko
 * @version 2.1.1
 *
 * See usage examples at http://jscolor.com/examples/
 */

"use strict";

import { BoxShadow } from "./BoxShadow";

const createSetStyle = () => {
  var helper = document.createElement("div");
  var getSupportedProp = (names) => {
    for (var i = 0; i < names.length; i += 1) {
      if (names[i] in helper.style) {
        return names[i];
      }
    }
  };
  var props = {
    borderRadius: getSupportedProp([
      "borderRadius",
      "MozBorderRadius",
      "webkitBorderRadius",
    ]),
    boxShadow: getSupportedProp([
      "boxShadow",
      "MozBoxShadow",
      "webkitBoxShadow",
    ]),
  };
  return function (elm, prop, value) {
    switch (prop.toLowerCase()) {
      case "opacity":
        var alphaOpacity = Math.round(parseFloat(value) * 100);
        elm.style.opacity = value;
        elm.style.filter = "alpha(opacity=" + alphaOpacity + ")";
        break;
      default:
        elm.style[props[prop]] = value;
        break;
    }
  };
};

interface IHSV {
  h: number;
  s: number | null;
  v: number | null;
}

export class JsColor {
  value: any = null; // initial HEX color. To change it later, use methods fromString(), fromHSV() and fromRGB()
  targetElement: any;
  valueElement: any; // element that will be used to display and input the color code
  styleElement: any; // element that will preview the picked color using CSS backgroundColor
  required: boolean = true; // whether the associated text <input> can be left empty
  refine: boolean = true; // whether to refine the entered color code (e.g. uppercase it and remove whitespace)
  hash: boolean = false; // whether to prefix the HEX color code with # symbol
  uppercase: boolean = true; // whether to show the color code in upper case
  onFineChange = null; // called instantly every time the color changes (value can be either a function or a string with javascript code)
  activeClass = "jscolor-active"; // class to be set to the target element when a picker window is open on it
  overwriteImportant = false; // whether to overwrite colors of styleElement using !important
  minS = 0; // min allowed saturation (0 - 100)
  maxS = 100; // max allowed saturation (0 - 100)
  minV = 0; // min allowed value (brightness) (0 - 100)
  maxV = 100; // max allowed value (brightness) (0 - 100)
  hsv: IHSV = {
    h: 0,
    s: 0,
    v: 100,
  }; // read-only  [0-360, 0-100, 0-100]
  rgb = [255, 255, 255]; // read-only  [0-255, 0-255, 0-255]

  sliderPtrSpace: number = 3;

  // Color Picker options
  //
  width = 181; // width of color palette (in px)
  height = 101; // height of color palette (in px)
  showOnClick = true; // whether to display the color picker when user clicks on its target element
  mode = "HSV"; // HSV | HVS | HS | HV - layout of the color picker controls
  position = "bottom"; // left | right | top | bottom - position relative to the target element
  smartPosition = true; // automatically change picker position when there is not enough space for it
  sliderSize = 16; // px
  crossSize = 8; // px
  closable = false; // whether to display the Close button
  closeText = "Close";
  buttonColor = "#000000"; // CSS color
  buttonHeight = 18; // px
  padding = 12; // px
  backgroundColor = "#FFFFFF"; // CSS color
  borderWidth = 1; // px
  borderColor = "#BBBBBB"; // CSS color
  borderRadius = 8; // px
  insetWidth = 1; // px
  insetColor = "#BBBBBB"; // CSS color
  shadow = true; // whether to display shadow
  shadowBlur = 15; // px
  shadowColor = "rgba(0,0,0,0.2)"; // CSS color
  pointerColor = "#4C4C4C"; // px
  pointerBorderColor = "#FFFFFF"; // CSS color
  pointerBorderWidth = 1; // px
  pointerThickness = 2; // px
  zIndex = 1000;
  container: any; // where to append the color picker (BODY element by default)
  presets = {};
  fixed: boolean = false;

  // static?
  picker: any;

  protected _linkedElementsProcessed: any;

  setStyle: (elm, prop, value) => void;
  //
  // Usage:
  // var myColor = new JsColor(<targetElement> [, <options>])
  //
  //
  constructor(targetElement, opts) {
    this.setStyle = createSetStyle();
    // General options
    this.targetElement = targetElement;
    this.valueElement = targetElement; // element that will be used to display and input the color code
    this.styleElement = targetElement; // element that will preview the picked color using CSS backgroundColor

    // Accessing the picked color
    //
    const jsc = this;
    const { options } = JsColor;
    const { warn, fetchElement, isElementType } = this;

    // let's process the DEPRECATED jscolor.options property
    // (this will be later removed)
    if (options) {
      // let's set custom default options, if specified
      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          jsc.setOption.call(this, opt, options[opt]);
        }
      }
    }

    // let's apply configuration presets
    //
    var presetsArr: string[] = [];
    if (opts.preset) {
      if (typeof opts.preset === "string") {
        presetsArr = opts.preset.split(/\s+/);
      } else if (Array.isArray(opts.preset)) {
        presetsArr = opts.preset.slice(); // to clone
      } else {
        warn("Unrecognized preset value");
      }
    }

    // always use the 'default' preset as a baseline
    presetsArr.push("default");

    // let's apply the presets in reverse order, so that should there be any overlapping options,
    // then the formerly listed preset overrides the latter
    for (var i = presetsArr.length - 1; i >= 0; i -= 1) {
      var pres = presetsArr[i];
      if (!pres) {
        continue; // preset is empty string
      }
      if (!jsc.presets.hasOwnProperty(pres)) {
        warn("Unknown preset '" + pres + "'");
        continue;
      }
      const { presets } = this;
      for (var opt in presets[pres]) {
        if (presets[pres].hasOwnProperty(opt)) {
          jsc.setOption.call(this, opt, presets[pres][opt]);
        }
      }
    }

    // let's set specific options for this color picker
    var nonProperties = ["preset"]; // these options won't be set as instance properties
    for (var opt in opts) {
      if (opts.hasOwnProperty(opt)) {
        if (nonProperties.indexOf(opt) === -1) {
          jsc.setOption.call(this, opt, opts[opt]);
        }
      }
    }
    // Find the target element
    if (typeof targetElement === "string") {
      var id = targetElement;
      var elm = document.getElementById(id);
      if (elm) {
        this.targetElement = elm;
      } else {
        warn("Could not find target element with ID '" + id + "'");
      }
    } else if (targetElement) {
      this.targetElement = targetElement;
    } else {
      warn("Invalid target element: '" + targetElement + "'");
    }

    if (this.targetElement._jscLinkedInstance) {
      warn("Cannot link jscolor twice to the same element. Skipping.");
      return;
    }
    this.targetElement._jscLinkedInstance = this;

    // Find the value element
    this.valueElement = fetchElement(this.valueElement);
    // Find the style element
    this.styleElement = fetchElement(this.styleElement);

    this.container = this.container;
    //   ? jsc.fetchElement(this.container)
    //   : document.getElementsByTagName("body")[0];
    this.sliderPtrSpace = 3; // px

    // For BUTTON elements it's important to stop them from sending the form when clicked
    // (e.g. in Safari)
    if (isElementType(this.targetElement, "button")) {
      if (this.targetElement.onclick) {
        var origCallback = this.targetElement.onclick;
        this.targetElement.onclick = function (evt) {
          origCallback.call(this, evt);
          return false;
        };
      } else {
        this.targetElement.onclick = function () {
          return false;
        };
      }
    }

    const { handleValueBlur } = this;
    const { attachEvent } = this;

    // valueElement
    if (this.valueElement) {
      if (isElementType(this.valueElement, "input")) {
        var handleValueInput = () => {
          this.fromString(this.valueElement.value, jsc.leaveValue);
          jsc.dispatchFineChange(this);
        };
        attachEvent(this.valueElement, "keyup", handleValueInput);
        attachEvent(this.valueElement, "input", handleValueInput);
        attachEvent(this.valueElement, "blur", handleValueBlur);
        this.valueElement.setAttribute("autocomplete", "off");
      }
    }

    // styleElement
    if (this.styleElement) {
      this.styleElement._jscOrigStyle = {
        backgroundImage: this.styleElement.style.backgroundImage,
        backgroundColor: this.styleElement.style.backgroundColor,
        color: this.styleElement.style.color,
      };
    }

    if (this.value) {
      // Try to set the color from the .value option and if unsuccessful,
      // export the current color
      this.fromString(this.value) || this.exportColor();
    } else {
      this.importColor();
    }
  }

  // r: 0-255
  // g: 0-255
  // b: 0-255
  //
  // returns: [ 0-360, 0-100, 0-100 ]
  //
  protected RGB_HSV(r, g, b): any {
    r /= 255;
    g /= 255;
    b /= 255;
    var n = Math.min(Math.min(r, g), b);
    var v = Math.max(Math.max(r, g), b);
    var m = v - n;
    if (m === 0) return [null, 0, 100 * v];
    var h =
      r === n ? 3 + (b - g) / m : g === n ? 5 + (r - b) / m : 1 + (g - r) / m;
    return {
      h: 60 * (h === 6 ? 0 : h),
      s: 100 * (m / v),
      v: 100 * v,
    };
  }

  // h: 0-360
  // s: 0-100
  // v: 0-100
  //
  // returns: [ 0-255, 0-255, 0-255 ]
  //
  protected HSV_RGB(h, s, v): any {
    var u = 255 * (v / 100);

    if (h === null) {
      return [u, u, u];
    }

    h /= 60;
    s /= 100;

    var i = Math.floor(h);
    var f = i % 2 ? h - i : 1 - (h - i);
    var m = u * (1 - s);
    var n = u * (1 - s * f);
    switch (i) {
      case 6:
      case 0:
        return [u, n, m];
      case 1:
        return [n, u, m];
      case 2:
        return [m, u, n];
      case 3:
        return [m, n, u];
      case 4:
        return [n, m, u];
      case 5:
        return [u, m, n];
    }
  }

  protected detachPicker() {
    this.unsetClass(this.targetElement, this.activeClass);
    this.picker.wrap.parentNode.removeChild(this.picker.wrap);
    delete this.picker.owner;
  }

  protected drawPicker() {
    const jsc = this;
    // At this point, when drawing the picker, we know what the parent elements are
    // and we can do all related DOM operations, such as registering events on them
    // or checking their positioning
    this._processParentElementsInDOM();

    if (!jsc.picker) {
      jsc.picker = {
        owner: null,
        wrap: document.createElement("div"),
        box: document.createElement("div"),
        boxS: document.createElement("div"), // shadow area
        boxB: document.createElement("div"), // border
        pad: document.createElement("div"),
        padB: document.createElement("div"), // border
        padM: document.createElement("div"), // mouse/touch area
        padPal: jsc.createPalette(),
        cross: document.createElement("div"),
        crossBY: document.createElement("div"), // border Y
        crossBX: document.createElement("div"), // border X
        crossLY: document.createElement("div"), // line Y
        crossLX: document.createElement("div"), // line X
        sld: document.createElement("div"),
        sldB: document.createElement("div"), // border
        sldM: document.createElement("div"), // mouse/touch area
        sldGrad: jsc.createSliderGradient(),
        sldPtrS: document.createElement("div"), // slider pointer spacer
        sldPtrIB: document.createElement("div"), // slider pointer inner border
        sldPtrMB: document.createElement("div"), // slider pointer middle border
        sldPtrOB: document.createElement("div"), // slider pointer outer border
        btn: document.createElement("div"),
        btnT: document.createElement("span"), // text
      };

      jsc.picker.pad.appendChild(jsc.picker.padPal.elm);
      jsc.picker.padB.appendChild(jsc.picker.pad);
      jsc.picker.cross.appendChild(jsc.picker.crossBY);
      jsc.picker.cross.appendChild(jsc.picker.crossBX);
      jsc.picker.cross.appendChild(jsc.picker.crossLY);
      jsc.picker.cross.appendChild(jsc.picker.crossLX);
      jsc.picker.padB.appendChild(jsc.picker.cross);
      jsc.picker.box.appendChild(jsc.picker.padB);
      jsc.picker.box.appendChild(jsc.picker.padM);

      jsc.picker.sld.appendChild(jsc.picker.sldGrad.elm);
      jsc.picker.sldB.appendChild(jsc.picker.sld);
      jsc.picker.sldB.appendChild(jsc.picker.sldPtrOB);
      jsc.picker.sldPtrOB.appendChild(jsc.picker.sldPtrMB);
      jsc.picker.sldPtrMB.appendChild(jsc.picker.sldPtrIB);
      jsc.picker.sldPtrIB.appendChild(jsc.picker.sldPtrS);
      jsc.picker.box.appendChild(jsc.picker.sldB);
      jsc.picker.box.appendChild(jsc.picker.sldM);

      jsc.picker.btn.appendChild(jsc.picker.btnT);
      jsc.picker.box.appendChild(jsc.picker.btn);

      jsc.picker.boxB.appendChild(jsc.picker.box);
      jsc.picker.wrap.appendChild(jsc.picker.boxS);
      jsc.picker.wrap.appendChild(jsc.picker.boxB);
    }

    var p = jsc.picker;

    var displaySlider = !!jsc.getSliderComponent(this);
    var dims = jsc.getPickerDims(this);
    var crossOuterSize =
      2 * this.pointerBorderWidth + this.pointerThickness + 2 * this.crossSize;
    var padToSliderPadding = jsc.getPadToSliderPadding(this);
    var borderRadius = Math.min(
      this.borderRadius,
      Math.round(this.padding * Math.PI)
    ); // px
    var padCursor = "crosshair";

    // wrap
    p.wrap.className = "jscolor-picker-wrap";
    p.wrap.style.clear = "both";
    p.wrap.style.width = dims[0] + 2 * this.borderWidth + "px";
    p.wrap.style.height = dims[1] + 2 * this.borderWidth + "px";
    p.wrap.style.zIndex = this.zIndex;

    // picker
    p.box.className = "jscolor-picker";
    p.box.style.width = dims[0] + "px";
    p.box.style.height = dims[1] + "px";

    // picker shadow
    p.boxS.className = "jscolor-picker-shadow";
    p.boxS.style.position = "absolute";
    p.boxS.style.left = "0";
    p.boxS.style.top = "0";
    p.boxS.style.width = "100%";
    p.boxS.style.height = "100%";
    jsc.setBorderRadius(p.boxS, borderRadius + "px");

    // picker border
    p.boxB.className = "jscolor-picker-border";
    p.boxB.style.position = "relative";
    p.boxB.style.border = this.borderWidth + "px solid";
    p.boxB.style.borderColor = this.borderColor;
    p.boxB.style.background = this.backgroundColor;
    jsc.setBorderRadius(p.boxB, borderRadius + "px");

    // IE hack:
    // If the element is transparent, IE will trigger the event on the elements under it,
    // e.g. on Canvas or on elements with border
    p.padM.style.background = p.sldM.style.background = "#FFF";
    jsc.setStyle(p.padM, "opacity", "0");
    jsc.setStyle(p.sldM, "opacity", "0");

    // pad
    p.pad.style.position = "relative";
    p.pad.style.width = this.width + "px";
    p.pad.style.height = this.height + "px";

    // pad palettes (HSV and HVS)
    p.padPal.draw(this.width, this.height, jsc.getPadYComponent(this));

    // pad border
    p.padB.style.position = "absolute";
    p.padB.style.left = this.padding + "px";
    p.padB.style.top = this.padding + "px";
    p.padB.style.border = this.insetWidth + "px solid";
    p.padB.style.borderColor = this.insetColor;

    // pad mouse area
    p.padM._jscInstance = this;
    p.padM._jscControlName = "pad";
    p.padM.style.position = "absolute";
    p.padM.style.left = "0";
    p.padM.style.top = "0";
    p.padM.style.width =
      this.padding +
      2 * this.insetWidth +
      this.width +
      padToSliderPadding / 2 +
      "px";
    p.padM.style.height = dims[1] + "px";
    p.padM.style.cursor = padCursor;

    // pad cross
    p.cross.style.position = "absolute";
    p.cross.style.left = p.cross.style.top = "0";
    p.cross.style.width = p.cross.style.height = crossOuterSize + "px";

    // pad cross border Y and X
    p.crossBY.style.position = p.crossBX.style.position = "absolute";
    p.crossBY.style.background = p.crossBX.style.background = this.pointerBorderColor;
    p.crossBY.style.width = p.crossBX.style.height =
      2 * this.pointerBorderWidth + this.pointerThickness + "px";
    p.crossBY.style.height = p.crossBX.style.width = crossOuterSize + "px";
    p.crossBY.style.left = p.crossBX.style.top =
      Math.floor(crossOuterSize / 2) -
      Math.floor(this.pointerThickness / 2) -
      this.pointerBorderWidth +
      "px";
    p.crossBY.style.top = p.crossBX.style.left = "0";

    // pad cross line Y and X
    p.crossLY.style.position = p.crossLX.style.position = "absolute";
    p.crossLY.style.background = p.crossLX.style.background = this.pointerColor;
    p.crossLY.style.height = p.crossLX.style.width =
      crossOuterSize - 2 * this.pointerBorderWidth + "px";
    p.crossLY.style.width = p.crossLX.style.height =
      this.pointerThickness + "px";
    p.crossLY.style.left = p.crossLX.style.top =
      Math.floor(crossOuterSize / 2) -
      Math.floor(this.pointerThickness / 2) +
      "px";
    p.crossLY.style.top = p.crossLX.style.left = this.pointerBorderWidth + "px";

    // slider
    p.sld.style.overflow = "hidden";
    p.sld.style.width = this.sliderSize + "px";
    p.sld.style.height = this.height + "px";

    // slider gradient
    p.sldGrad.draw(this.sliderSize, this.height, "#000", "#000");

    // slider border
    p.sldB.style.display = displaySlider ? "block" : "none";
    p.sldB.style.position = "absolute";
    p.sldB.style.right = this.padding + "px";
    p.sldB.style.top = this.padding + "px";
    p.sldB.style.border = this.insetWidth + "px solid";
    p.sldB.style.borderColor = this.insetColor;

    // slider mouse area
    p.sldM._jscInstance = this;
    p.sldM._jscControlName = "sld";
    p.sldM.style.display = displaySlider ? "block" : "none";
    p.sldM.style.position = "absolute";
    p.sldM.style.right = "0";
    p.sldM.style.top = "0";
    p.sldM.style.width =
      this.sliderSize +
      padToSliderPadding / 2 +
      this.padding +
      2 * this.insetWidth +
      "px";
    p.sldM.style.height = dims[1] + "px";
    p.sldM.style.cursor = "default";

    // slider pointer inner and outer border
    p.sldPtrIB.style.border = p.sldPtrOB.style.border =
      this.pointerBorderWidth + "px solid " + this.pointerBorderColor;

    // slider pointer outer border
    p.sldPtrOB.style.position = "absolute";
    p.sldPtrOB.style.left =
      -(2 * this.pointerBorderWidth + this.pointerThickness) + "px";
    p.sldPtrOB.style.top = "0";

    // slider pointer middle border
    p.sldPtrMB.style.border =
      this.pointerThickness + "px solid " + this.pointerColor;

    const { sliderPtrSpace } = this;
    // slider pointer spacer
    p.sldPtrS.style.width = this.sliderSize + "px";
    p.sldPtrS.style.height = sliderPtrSpace + "px";

    // the Close button
    const setBtnBorder = () => {
      var insetColors = this.insetColor.split(/\s+/);
      var outsetColor =
        insetColors.length < 2
          ? insetColors[0]
          : insetColors[1] +
            " " +
            insetColors[0] +
            " " +
            insetColors[0] +
            " " +
            insetColors[1];
      p.btn.style.borderColor = outsetColor;
    };
    p.btn.className = "jscolor-btn-close";
    p.btn.style.display = this.closable ? "block" : "none";
    p.btn.style.position = "absolute";
    p.btn.style.left = this.padding + "px";
    p.btn.style.bottom = this.padding + "px";
    p.btn.style.padding = "0 15px";
    p.btn.style.height = this.buttonHeight + "px";
    p.btn.style.border = this.insetWidth + "px solid";
    setBtnBorder();
    p.btn.style.color = this.buttonColor;
    p.btn.style.font = "12px sans-serif";
    p.btn.style.textAlign = "center";
    try {
      p.btn.style.cursor = "pointer";
    } catch (eOldIE) {
      p.btn.style.cursor = "hand";
    }
    p.btn.onmousedown = function () {
      this.hide();
    };
    p.btnT.style.lineHeight = this.buttonHeight + "px";
    p.btnT.innerHTML = "";
    p.btnT.appendChild(document.createTextNode(this.closeText));

    // place pointers
    this.redrawPad();
    this.redrawSld();

    // If we are changing the owner without first closing the picker,
    // make sure to first deal with the old owner
    if (jsc.picker.owner && jsc.picker.owner !== this) {
      jsc.unsetClass(jsc.picker.owner.targetElement, this.activeClass);
    }

    // Set the new picker owner
    jsc.picker.owner = this;

    const { isElementType, container } = this;
    // The redrawPosition() method needs picker.owner to be set, that's why we call it here,
    // after setting the owner
    if (isElementType(container, "body")) {
      jsc.redrawPosition();
    } else {
      jsc._drawPosition(this, 0, 0, "relative", false);
    }

    if (p.wrap.parentNode != container) {
      container.appendChild(p.wrap);
    }

    jsc.setClass(this.targetElement, this.activeClass);
  }

  protected redrawPad() {
    const jsc = this;
    // redraw the pad pointer
    switch (jsc.getPadYComponent(this)) {
      case "s":
        var yComponent = 1;
        break;
      case "v":
        var yComponent = 2;
        break;
    }
    var x = Math.round((this.hsv.h / 360) * (this.width - 1));
    var y = Math.round((1 - this.hsv[yComponent] / 100) * (this.height - 1));
    var crossOuterSize =
      2 * this.pointerBorderWidth + this.pointerThickness + 2 * this.crossSize;
    var ofs = -Math.floor(crossOuterSize / 2);
    jsc.picker.cross.style.left = x + ofs + "px";
    jsc.picker.cross.style.top = y + ofs + "px";

    const { HSV_RGB } = this;

    // redraw the slider
    switch (jsc.getSliderComponent(this)) {
      case "s":
        var rgb1 = HSV_RGB(this.hsv[0], 100, this.hsv[2]);
        var rgb2 = HSV_RGB(this.hsv[0], 0, this.hsv[2]);
        var color1 =
          "rgb(" +
          Math.round(rgb1[0]) +
          "," +
          Math.round(rgb1[1]) +
          "," +
          Math.round(rgb1[2]) +
          ")";
        var color2 =
          "rgb(" +
          Math.round(rgb2[0]) +
          "," +
          Math.round(rgb2[1]) +
          "," +
          Math.round(rgb2[2]) +
          ")";
        jsc.picker.sldGrad.draw(this.sliderSize, this.height, color1, color2);
        break;
      case "v":
        var rgb = HSV_RGB(this.hsv.h, this.hsv.s, 100);
        var color1 =
          "rgb(" +
          Math.round(rgb[0]) +
          "," +
          Math.round(rgb[1]) +
          "," +
          Math.round(rgb[2]) +
          ")";
        var color2 = "#000";
        jsc.picker.sldGrad.draw(this.sliderSize, this.height, color1, color2);
        break;
    }
  }

  protected redrawSld() {
    const jsc = this;
    var sldComponent = jsc.getSliderComponent(this);
    var yComponent = "v";
    if (sldComponent) {
      // redraw the slider pointer
      switch (sldComponent) {
        case "s":
          yComponent = "v";
          break;
        case "v":
          yComponent = "s";
          break;
      }
      var y = Math.round((1 - this.hsv[yComponent] / 100) * (this.height - 1));
      const { sliderPtrSpace } = this;
      jsc.picker.sldPtrOB.style.top =
        y -
        (2 * this.pointerBorderWidth + this.pointerThickness) -
        Math.floor(sliderPtrSpace / 2) +
        "px";
    }
  }

  protected isPickerOwner() {
    const jsc = this;
    return jsc.picker && jsc.picker.owner === this;
  }

  protected handleValueBlur = () => {
    this.importColor();
  };

  hide() {
    if (this.isPickerOwner()) {
      this.detachPicker();
    }
  }

  show() {
    this.drawPicker();
  }

  redraw() {
    if (this.isPickerOwner()) {
      this.drawPicker();
    }
  }

  importColor() {
    const jsc = this;
    const { isElementType } = this;
    if (!this.valueElement) {
      this.exportColor();
    } else {
      if (isElementType(this.valueElement, "input")) {
        if (!this.refine) {
          if (!this.fromString(this.valueElement.value, jsc.leaveValue)) {
            if (this.styleElement) {
              this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage;
              this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor;
              this.styleElement.style.color = this.styleElement._jscOrigStyle.color;
            }
            this.exportColor(jsc.leaveValue | jsc.leaveStyle);
          }
        } else if (!this.required && /^\s*$/.test(this.valueElement.value)) {
          this.valueElement.value = "";
          if (this.styleElement) {
            this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage;
            this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor;
            this.styleElement.style.color = this.styleElement._jscOrigStyle.color;
          }
          this.exportColor(jsc.leaveValue | jsc.leaveStyle);
        } else if (this.fromString(this.valueElement.value)) {
          // managed to import color successfully from the value -> OK, don't do anything
        } else {
          this.exportColor();
        }
      } else {
        // not an input element -> doesn't have any value
        this.exportColor();
      }
    }
  }

  exportColor(flags?) {
    const jsc = this;
    const { isElementType } = this;
    if (!(flags & jsc.leaveValue) && this.valueElement) {
      var value = this.toString();
      if (this.uppercase) value = value.toUpperCase();
      if (this.hash) value = "#" + value;

      if (isElementType(this.valueElement, "input")) {
        if (this.valueElement.value !== value) {
          this.valueElement.value = value;
        }
      } else {
        this.valueElement.innerHTML = value;
      }
    }
    if (!(flags & jsc.leaveStyle)) {
      if (this.styleElement) {
        var bgColor = "#" + this.toString();
        var fgColor = this.isLight() ? "#000" : "#FFF";

        this.styleElement.style.backgroundImage = "none";
        this.styleElement.style.backgroundColor = bgColor;
        this.styleElement.style.color = fgColor;

        if (this.overwriteImportant) {
          this.styleElement.setAttribute(
            "style",
            "background: " +
              bgColor +
              " !important; " +
              "color: " +
              fgColor +
              " !important;"
          );
        }
      }
    }
    const { isPickerOwner, redrawPad, redrawSld } = this;
    if (!(flags & jsc.leavePad) && isPickerOwner()) {
      redrawPad();
    }
    if (!(flags & jsc.leaveSld) && isPickerOwner()) {
      redrawSld();
    }
  }

  // h: 0-360
  // s: 0-100
  // v: 0-100
  //
  fromHSV(h, s, v, flags): any {
    // null = don't change
    if (h !== null) {
      if (isNaN(h)) return false;
      h = Math.max(0, Math.min(360, h));
    }
    if (s !== null) {
      if (isNaN(s)) return false;
      s = Math.max(0, Math.min(100, this.maxS, s), this.minS);
    }
    if (v !== null) {
      if (isNaN(v)) return false;
      v = Math.max(0, Math.min(100, this.maxV, v), this.minV);
    }

    const { HSV_RGB } = this;
    this.rgb = HSV_RGB(
      h === null ? this.hsv.h : (this.hsv.h = h),
      s === null ? this.hsv.s : (this.hsv.s = s),
      v === null ? this.hsv.v : (this.hsv.v = v)
    );

    this.exportColor(flags);
  }

  // r: 0-255
  // g: 0-255
  // b: 0-255
  //
  fromRGB(r, g, b, flags): any {
    // null = don't change
    if (r !== null) {
      if (isNaN(r)) return false;
      r = Math.max(0, Math.min(255, r));
    }
    if (g !== null) {
      if (isNaN(g)) return false;
      g = Math.max(0, Math.min(255, g));
    }
    if (b !== null) {
      if (isNaN(b)) return false;
      b = Math.max(0, Math.min(255, b));
    }

    const { RGB_HSV } = this;
    var hsv = RGB_HSV(
      r === null ? this.rgb[0] : r,
      g === null ? this.rgb[1] : g,
      b === null ? this.rgb[2] : b
    );
    if (hsv.h !== null) {
      this.hsv.h = Math.max(0, Math.min(360, hsv.h));
    }
    if (hsv.v !== 0) {
      this.hsv.s =
        hsv.s === null
          ? null
          : Math.max(0, this.minS, Math.min(100, this.maxS, hsv.s));
    }
    this.hsv.v =
      hsv.v === null
        ? null
        : Math.max(0, this.minV, Math.min(100, this.maxV, hsv.v));

    const { HSV_RGB } = this;
    // update RGB according to final HSV, as some values might be trimmed
    var rgb = HSV_RGB(this.hsv.h, this.hsv.s, this.hsv.v);
    this.rgb[0] = rgb[0];
    this.rgb[1] = rgb[1];
    this.rgb[2] = rgb[2];

    this.exportColor(flags);
  }

  fromString(str, flags?) {
    var m;
    if ((m = str.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i))) {
      // HEX notation
      //

      if (m[1].length === 6) {
        // 6-char notation
        this.fromRGB(
          parseInt(m[1].substr(0, 2), 16),
          parseInt(m[1].substr(2, 2), 16),
          parseInt(m[1].substr(4, 2), 16),
          flags
        );
      } else {
        // 3-char notation
        this.fromRGB(
          parseInt(m[1].charAt(0) + m[1].charAt(0), 16),
          parseInt(m[1].charAt(1) + m[1].charAt(1), 16),
          parseInt(m[1].charAt(2) + m[1].charAt(2), 16),
          flags
        );
      }
      return true;
    } else if ((m = str.match(/^\W*rgba?\(([^)]*)\)\W*$/i))) {
      var params = m[1].split(",");
      var re = /^\s*(\d*)(\.\d+)?\s*$/;
      var mR, mG, mB;
      if (
        params.length >= 3 &&
        (mR = params[0].match(re)) &&
        (mG = params[1].match(re)) &&
        (mB = params[2].match(re))
      ) {
        var r = parseFloat((mR[1] || "0") + (mR[2] || ""));
        var g = parseFloat((mG[1] || "0") + (mG[2] || ""));
        var b = parseFloat((mB[1] || "0") + (mB[2] || ""));
        this.fromRGB(r, g, b, flags);
        return true;
      }
    }
    return false;
  }

  toString() {
    return (
      (0x100 | Math.round(this.rgb[0])).toString(16).substr(1) +
      (0x100 | Math.round(this.rgb[1])).toString(16).substr(1) +
      (0x100 | Math.round(this.rgb[2])).toString(16).substr(1)
    );
  }

  toHEXString() {
    return "#" + this.toString().toUpperCase();
  }

  toRGBString() {
    return (
      "rgb(" +
      Math.round(this.rgb[0]) +
      "," +
      Math.round(this.rgb[1]) +
      "," +
      Math.round(this.rgb[2]) +
      ")"
    );
  }

  toGrayscale() {
    return 0.213 * this.rgb[0] + 0.715 * this.rgb[1] + 0.072 * this.rgb[2];
  }

  isLight() {
    return this.toGrayscale() > 255 / 2;
  }

  protected _processParentElementsInDOM() {
    if (this._linkedElementsProcessed) return;
    this._linkedElementsProcessed = true;
    const jsc = this;
    const { attachEvent, onParentScroll, isElementType } = this;
    var elm = this.targetElement;
    do {
      // If the target element or one of its parent nodes has fixed position,
      // then use fixed positioning instead
      //
      // Note: In Firefox, getComputedStyle returns null in a hidden iframe,
      // that's why we need to check if the returned style object is non-empty
      var currStyle = jsc.getStyle(elm);
      if (currStyle && currStyle.position.toLowerCase() === "fixed") {
        this.fixed = true;
      }
      if (elm !== this.targetElement) {
        // Ensure to attach onParentScroll only once to each parent element
        // (multiple targetElements can share the same parent nodes)
        //
        // Note: It's not just offsetParents that can be scrollable,
        // that's why we loop through all parent nodes
        if (!elm._jscEventsAttached) {
          attachEvent(elm, "scroll", onParentScroll);
          elm._jscEventsAttached = true;
        }
      }
    } while ((elm = elm.parentNode) && !isElementType(elm, "body"));
  }

  register() {
    const {
      attachEvent,
      attachDOMReadyEvent,
      onDocumentMouseDown,
      onDocumentTouchStart,
      onDocumentKeyUp,
      onWindowResize,
      init,
    } = this;

    attachDOMReadyEvent(init);
    attachEvent(document, "mousedown", onDocumentMouseDown);
    attachEvent(document, "touchstart", onDocumentTouchStart);
    attachEvent(document, "keyup", onDocumentKeyUp);
    attachEvent(window, "resize", onWindowResize);
  }

  tryInstallOnElements(elms, className) {
    const jsc = this;
    var matchClass = new RegExp(
      "(^|\\s)(" + className + ")(\\s*(\\{[^}]*\\})|\\s|$)",
      "i"
    );

    for (var i = 0; i < elms.length; i += 1) {
      if (elms[i].type !== undefined && elms[i].type.toLowerCase() == "color") {
        if (jsc.isColorAttrSupported) {
          // skip inputs of type 'color' if supported by the browser
          continue;
        }
      }

      if (elms[i].jscolor) {
        // jscolor is already installed on this element
        continue;
      }

      var m, dataOpts;

      if (
        (dataOpts = this.getDataAttr(elms[i], "jscolor")) !== null ||
        (elms[i].className && (m = elms[i].className.match(matchClass)))
      ) {
        var targetElm = elms[i];
        var optsStr = null;

        if (dataOpts !== null) {
          optsStr = dataOpts;
        } else if (m && m[4]) {
          optsStr = m[4];
        }

        var opts = {};
        if (optsStr) {
          try {
            opts = new Function("return (" + optsStr + ")")();
          } catch (eParseError) {
            jsc.warn(
              "Error parsing jscolor options: " + eParseError + ":\n" + optsStr
            );
          }
        }
        targetElm.jscolor = new JsColor(targetElm, opts);
      }
    }
  }

  get isColorAttrSupported() {
    var elm = document.createElement("input");
    if (elm.setAttribute) {
      elm.setAttribute("type", "color");
      if (elm.type.toLowerCase() == "color") {
        return true;
      }
    }
    return false;
  }

  get isCanvasSupported() {
    var elm = document.createElement("canvas");
    return !!(elm.getContext && elm.getContext("2d"));
  }

  fetchElement(mixed) {
    return typeof mixed === "string" ? document.getElementById(mixed) : mixed;
  }

  isElementType(elm, type) {
    return elm.nodeName.toLowerCase() === type.toLowerCase();
  }

  getDataAttr(el, name) {
    var attrName = "data-" + name;
    var attrValue = el.getAttribute(attrName);
    if (attrValue !== null) {
      return attrValue;
    }
    return null;
  }

  attachEvent(el, evnt, func) {
    if (el.addEventListener) {
      el.addEventListener(evnt, func, false);
    } else if (el.attachEvent) {
      el.attachEvent("on" + evnt, func);
    }
  }

  detachEvent(el, evnt, func) {
    if (el.removeEventListener) {
      el.removeEventListener(evnt, func, false);
    } else if (el.detachEvent) {
      el.detachEvent("on" + evnt, func);
    }
  }

  _attachedGroupEvents = {};

  attachGroupEvent(groupName, el, evnt, func) {
    const jsc = this;
    if (!jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
      jsc._attachedGroupEvents[groupName] = [];
    }
    jsc._attachedGroupEvents[groupName].push([el, evnt, func]);
    jsc.attachEvent(el, evnt, func);
  }

  detachGroupEvents(groupName) {
    const jsc = this;
    if (jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
      for (var i = 0; i < jsc._attachedGroupEvents[groupName].length; i += 1) {
        var evt = jsc._attachedGroupEvents[groupName][i];
        jsc.detachEvent(evt[0], evt[1], evt[2]);
      }
      delete jsc._attachedGroupEvents[groupName];
    }
  }

  attachDOMReadyEvent(func: () => void) {
    var fired = false;
    var fireOnce = function () {
      if (!fired) {
        fired = true;
        func();
      }
    };

    if (document.readyState === "complete") {
      setTimeout(fireOnce, 1); // async
      return;
    }

    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fireOnce, false);

      // Fallback
      window.addEventListener("load", fireOnce, false);
    } else {
      throw "This (old) browser is not supported";
    }
  }

  static warn(msg) {
    if (window.console && window.console.warn) {
      window.console.warn(msg);
    }
  }

  preventDefault(e) {
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  captureTarget(target) {
    const jsc = this;
    // IE
    if (target.setCapture) {
      jsc._capturedTarget = target;
      jsc._capturedTarget.setCapture();
    }
  }

  releaseTarget() {
    const jsc = this;
    // IE
    if (jsc._capturedTarget) {
      jsc._capturedTarget.releaseCapture();
      jsc._capturedTarget = null;
    }
  }

  fireEvent(el: HTMLElement, evnt: any) {
    if (!el) {
      return;
    }
    if (document.createEvent) {
      var ev = document.createEvent("HTMLEvents");
      ev.initEvent(evnt, true, true);
      el.dispatchEvent(ev);
    } else {
      throw "Old browsers not supported";
    }
  }

  classNameToList(className: string) {
    return className.replace(/^\s+|\s+$/g, "").split(/\s+/);
  }

  // The className parameter (str) can only contain a single class name
  hasClass(elm: HTMLElement, className: string) {
    if (!className) {
      return false;
    }
    return (
      -1 !=
      (" " + elm.className.replace(/\s+/g, " ") + " ").indexOf(
        " " + className + " "
      )
    );
  }

  // The className parameter (str) can contain multiple class names separated by whitespace
  setClass(elm: HTMLElement, className: string) {
    const jsc = this;
    var classList = jsc.classNameToList(className);
    for (var i = 0; i < classList.length; i += 1) {
      if (!jsc.hasClass(elm, classList[i])) {
        elm.className += (elm.className ? " " : "") + classList[i];
      }
    }
  }

  // The className parameter (str) can contain multiple class names separated by whitespace
  unsetClass(elm: HTMLElement, className: string) {
    const jsc = this;
    var classList = jsc.classNameToList(className);
    for (var i = 0; i < classList.length; i += 1) {
      var repl = new RegExp(
        "^\\s*" +
          classList[i] +
          "\\s*|" +
          "\\s*" +
          classList[i] +
          "\\s*$|" +
          "\\s+" +
          classList[i] +
          "(\\s+)",
        "g"
      );
      elm.className = elm.className.replace(repl, "$1");
    }
  }

  getStyle(elm) {
    return window.getComputedStyle
      ? window.getComputedStyle(elm)
      : elm.currentStyle;
  }

  setBorderRadius(elm, value) {
    const jsc = this;
    jsc.setStyle(elm, "borderRadius", value || "0");
  }

  setBoxShadow(elm, value) {
    const jsc = this;
    jsc.setStyle(elm, "boxShadow", value || "none");
  }

  getElementPos(e, relativeToViewport?) {
    const jsc = this;
    var x = 0,
      y = 0;
    var rect = e.getBoundingClientRect();
    x = rect.left;
    y = rect.top;
    if (!relativeToViewport) {
      var viewPos = jsc.getViewPos();
      x += viewPos[0];
      y += viewPos[1];
    }
    return [x, y];
  }

  getElementSize(e) {
    return [e.offsetWidth, e.offsetHeight];
  }

  // get pointer's X/Y coordinates relative to viewport
  getAbsPointerPos(e) {
    if (!e) e = window.event;
    var x = 0,
      y = 0;
    if (typeof e.changedTouches !== "undefined" && e.changedTouches.length) {
      // touch devices
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    } else if (typeof e.clientX === "number") {
      x = e.clientX;
      y = e.clientY;
    }
    return { x: x, y: y };
  }

  // get pointer's X/Y coordinates relative to target element
  getRelPointerPos(e) {
    if (!e) e = window.event;
    var target = e.target || e.srcElement;
    var targetRect = target.getBoundingClientRect();

    var x = 0,
      y = 0;

    var clientX = 0,
      clientY = 0;
    if (typeof e.changedTouches !== "undefined" && e.changedTouches.length) {
      // touch devices
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if (typeof e.clientX === "number") {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    x = clientX - targetRect.left;
    y = clientY - targetRect.top;
    return { x: x, y: y };
  }

  getViewPos() {
    var doc = document.documentElement;
    return [
      (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
    ];
  }

  getViewSize() {
    var doc = document.documentElement;
    return [
      window.innerWidth || doc.clientWidth,
      window.innerHeight || doc.clientHeight,
    ];
  }

  warn(msg: string) {
    JsColor.warn(msg);
  }

  setOption(option, value): any {
    const jsc = this;
    if (typeof this[option] === "undefined") {
      jsc.warn("Unrecognized option '" + option + "'");
      return false;
    }
    this[option] = value;
  }

  redrawPosition() {
    const jsc = this;
    if (jsc.picker && jsc.picker.owner) {
      var thisObj = jsc.picker.owner;

      var tp, vp;

      if (thisObj.fixed) {
        // Fixed elements are positioned relative to viewport,
        // therefore we can ignore the scroll offset
        tp = jsc.getElementPos(thisObj.targetElement, true); // target pos
        vp = [0, 0]; // view pos
      } else {
        tp = jsc.getElementPos(thisObj.targetElement); // target pos
        vp = jsc.getViewPos(); // view pos
      }

      var ts = jsc.getElementSize(thisObj.targetElement); // target size
      var vs = jsc.getViewSize(); // view size
      var ps = jsc.getPickerOuterDims(thisObj); // picker size
      var a, b, c;
      switch (thisObj.position.toLowerCase()) {
        case "left":
          a = 1;
          b = 0;
          c = -1;
          break;
        case "right":
          a = 1;
          b = 0;
          c = 1;
          break;
        case "top":
          a = 0;
          b = 1;
          c = -1;
          break;
        default:
          a = 0;
          b = 1;
          c = 1;
          break;
      }
      var l = (ts[b] + ps[b]) / 2;

      // compute picker position
      if (!thisObj.smartPosition) {
        var pp = [tp[a], tp[b] + ts[b] - l + l * c];
      } else {
        var pp = [
          -vp[a] + tp[a] + ps[a] > vs[a]
            ? -vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 &&
              tp[a] + ts[a] - ps[a] >= 0
              ? tp[a] + ts[a] - ps[a]
              : tp[a]
            : tp[a],
          -vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b]
            ? -vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 &&
              tp[b] + ts[b] - l - l * c >= 0
              ? tp[b] + ts[b] - l - l * c
              : tp[b] + ts[b] - l + l * c
            : tp[b] + ts[b] - l + l * c >= 0
            ? tp[b] + ts[b] - l + l * c
            : tp[b] + ts[b] - l - l * c,
        ];
      }

      var x = pp[a];
      var y = pp[b];
      var positionValue = thisObj.fixed ? "fixed" : "absolute";
      var contractShadow =
        (pp[0] + ps[0] > tp[0] || pp[0] < tp[0] + ts[0]) &&
        pp[1] + ps[1] < tp[1] + ts[1];

      jsc._drawPosition(thisObj, x, y, positionValue, contractShadow);
    }
  }

  protected _drawPosition(thisObj, x, y, positionValue, contractShadow) {
    const jsc = this;
    var vShadow = contractShadow ? 0 : thisObj.shadowBlur; // px

    jsc.picker.wrap.style.position = positionValue;
    jsc.picker.wrap.style.left = x + "px";
    jsc.picker.wrap.style.top = y + "px";

    jsc.setBoxShadow(
      jsc.picker.boxS,
      thisObj.shadow
        ? new BoxShadow(0, vShadow, thisObj.shadowBlur, 0, thisObj.shadowColor)
        : null
    );
  }

  getPickerDims(thisObj) {
    const jsc = this;
    var displaySlider = !!jsc.getSliderComponent(thisObj);
    var dims = [
      2 * thisObj.insetWidth +
        2 * thisObj.padding +
        thisObj.width +
        (displaySlider
          ? 2 * thisObj.insetWidth +
            jsc.getPadToSliderPadding(thisObj) +
            thisObj.sliderSize
          : 0),
      2 * thisObj.insetWidth +
        2 * thisObj.padding +
        thisObj.height +
        (thisObj.closable
          ? 2 * thisObj.insetWidth + thisObj.padding + thisObj.buttonHeight
          : 0),
    ];
    return dims;
  }

  getPickerOuterDims(thisObj) {
    const jsc = this;
    var dims = jsc.getPickerDims(thisObj);
    return [
      dims[0] + 2 * thisObj.borderWidth,
      dims[1] + 2 * thisObj.borderWidth,
    ];
  }

  getPadToSliderPadding(thisObj) {
    return Math.max(
      thisObj.padding,
      1.5 * (2 * thisObj.pointerBorderWidth + thisObj.pointerThickness)
    );
  }

  getPadYComponent(thisObj) {
    switch (thisObj.mode.charAt(1).toLowerCase()) {
      case "v":
        return "v";
        break;
    }
    return "s";
  }

  getSliderComponent(thisObj) {
    if (thisObj.mode.length > 2) {
      switch (thisObj.mode.charAt(2).toLowerCase()) {
        case "s":
          return "s";
          break;
        case "v":
          return "v";
          break;
      }
    }
    return null;
  }

  onDocumentMouseDown = (e) => {
    const { onControlPointerStart, picker } = this;
    if (!e) e = window.event;
    var target = e.target || e.srcElement;

    if (target._jscLinkedInstance) {
      if (target._jscLinkedInstance.showOnClick) {
        target._jscLinkedInstance.show();
      }
    } else if (target._jscControlName) {
      onControlPointerStart(e, target, target._jscControlName, "mouse");
    } else {
      // Mouse is outside the picker controls -> hide the color picker!
      if (picker && picker.owner) {
        picker.owner.hide();
      }
    }
  };

  onDocumentTouchStart = (e) => {
    const jsc = this;
    if (!e) e = window.event;
    var target = e.target || e.srcElement;

    if (target._jscLinkedInstance) {
      if (target._jscLinkedInstance.showOnClick) {
        target._jscLinkedInstance.show();
      }
    } else if (target._jscControlName) {
      jsc.onControlPointerStart(e, target, target._jscControlName, "touch");
    } else {
      if (jsc.picker && jsc.picker.owner) {
        jsc.picker.owner.hide();
      }
    }
  };

  protected onDocumentKeyUp = (e) => {
    const jsc = this;
    if (!e) e = window.event;

    if (
      (e.code && e.code === "Enter") ||
      e.keyCode === 13 ||
      (e.code && e.code === "Escape") ||
      e.keyCode === 27
    ) {
      if (jsc.picker && jsc.picker.owner) {
        jsc.picker.owner.hide();
      }
    }
  };

  protected onWindowResize = (_e) => {
    const jsc = this;
    jsc.redrawPosition();
  };

  protected onParentScroll = (_e) => {
    const jsc = this;
    // hide the picker when one of the parent elements is scrolled
    if (jsc.picker && jsc.picker.owner) {
      jsc.picker.owner.hide();
    }
  };

  protected _pointerMoveEvent = {
    mouse: "mousemove",
    touch: "touchmove",
  };

  protected _pointerEndEvent = {
    mouse: "mouseup",
    touch: "touchend",
  };

  protected _pointerOrigin: any = null;
  protected _capturedTarget: any = null;

  protected onControlPointerStart = (e, target, controlName, pointerType) => {
    var thisObj = target._jscInstance;
    const jsc = this;
    jsc.preventDefault(e);
    jsc.captureTarget(target);

    var registerDragEvents = function (doc, offset) {
      jsc.attachGroupEvent(
        "drag",
        doc,
        jsc._pointerMoveEvent[pointerType],
        jsc.onDocumentPointerMove(e, target, controlName, pointerType, offset)
      );
      jsc.attachGroupEvent(
        "drag",
        doc,
        jsc._pointerEndEvent[pointerType],
        jsc.onDocumentPointerEnd(e, target, controlName, pointerType)
      );
    };

    registerDragEvents(document, [0, 0]);

    if (window.parent && window.frameElement) {
      var rect = window.frameElement.getBoundingClientRect();
      var ofs = [-rect.left, -rect.top];
      registerDragEvents(window.parent.window.document, ofs);
    }

    var abs = jsc.getAbsPointerPos(e);
    var rel = jsc.getRelPointerPos(e);
    jsc._pointerOrigin = {
      x: abs.x - rel.x,
      y: abs.y - rel.y,
    };

    switch (controlName) {
      case "pad":
        // if the slider is at the bottom, move it up
        switch (jsc.getSliderComponent(thisObj)) {
          case "s":
            if (thisObj.hsv[1] === 0) thisObj.fromHSV(null, 100, null);
            break;
          case "v":
            if (thisObj.hsv[2] === 0) thisObj.fromHSV(null, null, 100);
            break;
        }
        jsc.setPad(thisObj, e, 0, 0);
        break;

      case "sld":
        jsc.setSld(thisObj, e, 0);
        break;
    }

    jsc.dispatchFineChange(thisObj);
  };

  protected onDocumentPointerMove = (
    _e,
    target,
    controlName,
    _pointerType,
    offset
  ) => {
    const jsc = this;
    return function (e) {
      var thisObj = target._jscInstance;
      switch (controlName) {
        case "pad":
          if (!e) e = window.event;
          jsc.setPad(thisObj, e, offset[0], offset[1]);
          jsc.dispatchFineChange(thisObj);
          break;

        case "sld":
          if (!e) e = window.event;
          jsc.setSld(thisObj, e, offset[1]);
          jsc.dispatchFineChange(thisObj);
          break;
      }
    };
  };

  protected onDocumentPointerEnd = (_e, target, _controlName, _pointerType) => {
    const jsc = this;
    return function (_e) {
      var thisObj = target._jscInstance;
      jsc.detachGroupEvents("drag");
      jsc.releaseTarget();
      // Always dispatch changes after detaching outstanding mouse handlers,
      // in case some user interaction will occur in user's onchange callback
      // that would intrude with current mouse events
      jsc.dispatchChange(thisObj);
    };
  };

  protected dispatchChange(thisObj) {
    const jsc = this;
    if (thisObj.valueElement) {
      if (jsc.isElementType(thisObj.valueElement, "input")) {
        jsc.fireEvent(thisObj.valueElement, "change");
      }
    }
  }

  protected dispatchFineChange = (thisObj) => {
    if (thisObj.onFineChange) {
      var callback;
      if (typeof thisObj.onFineChange === "string") {
        callback = new Function(thisObj.onFineChange);
      } else {
        callback = thisObj.onFineChange;
      }
      callback.call(thisObj);
    }
  };

  protected setPad = (thisObj, e, ofsX, ofsY) => {
    const jsc = this;
    var pointerAbs = jsc.getAbsPointerPos(e);
    var x =
      ofsX +
      pointerAbs.x -
      jsc._pointerOrigin.x -
      thisObj.padding -
      thisObj.insetWidth;
    var y =
      ofsY +
      pointerAbs.y -
      jsc._pointerOrigin.y -
      thisObj.padding -
      thisObj.insetWidth;

    var xVal = x * (360 / (thisObj.width - 1));
    var yVal = 100 - y * (100 / (thisObj.height - 1));

    switch (jsc.getPadYComponent(thisObj)) {
      case "s":
        thisObj.fromHSV(xVal, yVal, null, jsc.leaveSld);
        break;
      case "v":
        thisObj.fromHSV(xVal, null, yVal, jsc.leaveSld);
        break;
    }
  };

  protected setSld = (thisObj, e, ofsY) => {
    const jsc = this;
    var pointerAbs = jsc.getAbsPointerPos(e);
    var y =
      ofsY +
      pointerAbs.y -
      jsc._pointerOrigin.y -
      thisObj.padding -
      thisObj.insetWidth;

    var yVal = 100 - y * (100 / (thisObj.height - 1));

    switch (jsc.getSliderComponent(thisObj)) {
      case "s":
        thisObj.fromHSV(null, yVal, null, jsc.leavePad);
        break;
      case "v":
        thisObj.fromHSV(null, null, yVal, jsc.leavePad);
        break;
    }
  };

  protected _vmlNS = "jsc_vml_";
  protected _vmlCSS = "jsc_vml_css_";
  protected _vmlReady = false;

  protected initVML = () => {
    const jsc = this;
    if (!jsc._vmlReady) {
      // init VML namespace
      var doc = document;
      var namespaces = doc["namespaces"];
      if (!namespaces[jsc._vmlNS]) {
        namespaces.add(jsc._vmlNS, "urn:schemas-microsoft-com:vml");
      }
      if (!doc.styleSheets[jsc._vmlCSS]) {
        var tags = [
          "shape",
          "shapetype",
          "group",
          "background",
          "path",
          "formulas",
          "handles",
          "fill",
          "stroke",
          "shadow",
          "textbox",
          "textpath",
          "imagedata",
          "line",
          "polyline",
          "curve",
          "rect",
          "roundrect",
          "oval",
          "arc",
          "image",
        ];
        var ss = doc["createStyleSheet"]();
        ss.owningElement.id = jsc._vmlCSS;
        for (var i = 0; i < tags.length; i += 1) {
          ss.addRule(
            jsc._vmlNS + "\\:" + tags[i],
            "behavior:url(#default#VML);"
          );
        }
      }
      jsc._vmlReady = true;
    }
  };

  protected createPalette() {
    var paletteObj: any = {
      elm: null,
      draw: null,
    };
    const jsc = this;

    if (jsc.isCanvasSupported) {
      // Canvas implementation for modern browsers

      var canvas = document.createElement("canvas");
      var ctx: any = canvas.getContext("2d");

      var drawFunc = function (width, height, type) {
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var hGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        hGrad.addColorStop(0 / 6, "#F00");
        hGrad.addColorStop(1 / 6, "#FF0");
        hGrad.addColorStop(2 / 6, "#0F0");
        hGrad.addColorStop(3 / 6, "#0FF");
        hGrad.addColorStop(4 / 6, "#00F");
        hGrad.addColorStop(5 / 6, "#F0F");
        hGrad.addColorStop(6 / 6, "#F00");

        ctx.fillStyle = hGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var vGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        switch (type.toLowerCase()) {
          case "s":
            vGrad.addColorStop(0, "rgba(255,255,255,0)");
            vGrad.addColorStop(1, "rgba(255,255,255,1)");
            break;
          case "v":
            vGrad.addColorStop(0, "rgba(0,0,0,0)");
            vGrad.addColorStop(1, "rgba(0,0,0,1)");
            break;
        }
        ctx.fillStyle = vGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      paletteObj.elm = canvas;
      paletteObj.draw = drawFunc;
    } else {
      // VML fallback for IE 7 and 8

      jsc.initVML();

      var vmlContainer = document.createElement("div");
      vmlContainer.style.position = "relative";
      vmlContainer.style.overflow = "hidden";

      var hGrad: any = document.createElement(jsc._vmlNS + ":fill");
      hGrad.type = "gradient";
      hGrad.method = "linear";
      hGrad.angle = "90";
      hGrad.colors =
        "16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";

      var hRect: any = document.createElement(jsc._vmlNS + ":rect");
      hRect.style.position = "absolute";
      hRect.style.left = -1 + "px";
      hRect.style.top = -1 + "px";
      hRect.stroked = false;
      hRect.appendChild(hGrad);
      vmlContainer.appendChild(hRect);

      var vGrad: any = document.createElement(jsc._vmlNS + ":fill");
      vGrad.type = "gradient";
      vGrad.method = "linear";
      vGrad.angle = "180";
      vGrad.opacity = "0";

      var vRect: any = document.createElement(jsc._vmlNS + ":rect");
      vRect.style.position = "absolute";
      vRect.style.left = -1 + "px";
      vRect.style.top = -1 + "px";
      vRect.stroked = false;
      vRect.appendChild(vGrad);
      vmlContainer.appendChild(vRect);

      var drawFunc = function (width, height, type) {
        vmlContainer.style.width = width + "px";
        vmlContainer.style.height = height + "px";

        hRect.style.width = vRect.style.width = width + 1 + "px";
        hRect.style.height = vRect.style.height = height + 1 + "px";

        // Colors must be specified during every redraw, otherwise IE won't display
        // a full gradient during a subsequential redraw
        hGrad.color = "#F00";
        hGrad.color2 = "#F00";

        switch (type.toLowerCase()) {
          case "s":
            vGrad.color = vGrad.color2 = "#FFF";
            break;
          case "v":
            vGrad.color = vGrad.color2 = "#000";
            break;
        }
      };

      paletteObj.elm = vmlContainer;
      paletteObj.draw = drawFunc;
    }

    return paletteObj;
  }

  protected createSliderGradient() {
    var sliderObj: any = {
      elm: null,
      draw: null,
    };
    const jsc = this;

    if (jsc.isCanvasSupported) {
      // Canvas implementation for modern browsers

      var canvas = document.createElement("canvas");
      var ctx: any = canvas.getContext("2d");

      var drawFunc = function (width, height, color1, color2) {
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      sliderObj.elm = canvas;
      sliderObj.draw = drawFunc;
    } else {
      // VML fallback for IE 7 and 8

      jsc.initVML();

      var vmlContainer = document.createElement("div");
      vmlContainer.style.position = "relative";
      vmlContainer.style.overflow = "hidden";

      var grad: any = document.createElement(jsc._vmlNS + ":fill");
      grad.type = "gradient";
      grad.method = "linear";
      grad.angle = "180";

      var rect: any = document.createElement(jsc._vmlNS + ":rect");
      rect.style.position = "absolute";
      rect.style.left = -1 + "px";
      rect.style.top = -1 + "px";
      rect.stroked = false;
      rect.appendChild(grad);
      vmlContainer.appendChild(rect);

      var drawFunc = function (width, height, color1, color2) {
        vmlContainer.style.width = width + "px";
        vmlContainer.style.height = height + "px";

        rect.style.width = width + 1 + "px";
        rect.style.height = height + 1 + "px";

        grad.color = color1;
        grad.color2 = color2;
      };

      sliderObj.elm = vmlContainer;
      sliderObj.draw = drawFunc;
    }

    return sliderObj;
  }

  leaveValue = 1 << 0;
  leaveStyle = 1 << 1;
  leavePad = 1 << 2;
  leaveSld = 1 << 3;

  //================================
  // Public properties and methods
  //================================
  //
  // These will be publicly available via jscolor.<name> and JSColor.<name>
  //

  // Initializes jscolor on current DOM tree
  init = () => {
    if (this.lookupClass) {
      this.installByClassName(this.lookupClass);
    }
  };

  static presets = {
    default: {}, // baseline for customization
    light: {
      backgroundColor: "#FFFFFF",
      insetColor: "#BBBBBB",
    }, // default color scheme
    dark: {
      backgroundColor: "#333333",
      insetColor: "#999999",
    },
    small: { width: 101, height: 101 },
    medium: { width: 181, height: 101 }, // default size
    large: { width: 271, height: 151 },
    thin: {
      borderWidth: 1,
      insetWidth: 1,
      pointerBorderWidth: 1,
    }, // default thickness
    thick: {
      borderWidth: 2,
      insetWidth: 2,
      pointerBorderWidth: 2,
    },
  };

  //
  // Custom default options for all color pickers, e.g. { hash: true, width: 300 }
  static options = {};

  // DEPRECATED. Use data-jscolor attribute instead, which installs jscolor on given element.
  //
  // By default, we'll search for all elements with class="jscolor" and install a color picker on them.
  //
  // You can change what class name will be looked for by setting the property jscolor.lookupClass
  // anywhere in your HTML document. To completely disable the automatic lookup, set it to null.
  //
  lookupClass = "jscolor";

  // DEPRECATED. Use data-jscolor attribute instead, which installs jscolor on given element.
  //
  // Install jscolor on all elements that have the specified class name
  installByClassName(className) {
    const jsc = this;
    var inputElms = document.getElementsByTagName("input");
    var buttonElms = document.getElementsByTagName("button");

    jsc.tryInstallOnElements(inputElms, className);
    jsc.tryInstallOnElements(buttonElms, className);
  }
}

export default JsColor;
