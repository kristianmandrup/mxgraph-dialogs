import { BaseControl } from "./BaseControl";
import mx from "@mxgraph-app/mx";
const { mxEvent, mxUtils, mxResources } = mx;

export class DpiControl extends BaseControl {
  zoomUserChanged = false;

  appendDpiDisplay(row) {
    const td = this.createCell();
    td.style.fontSize = "10pt";
    mxUtils.write(td, mxResources.get("dpi") + ":");
    row.appendChild(td);
    return row;
  }

  appendDpi100(dpiSelect) {
    var dpi100Option = document.createElement("option");
    dpi100Option.setAttribute("value", "100");
    mxUtils.write(dpi100Option, "100dpi");
    dpiSelect.appendChild(dpi100Option);
    return dpiSelect;
  }

  appendDpi200(dpiSelect) {
    var dpi200Option = document.createElement("option");
    dpi200Option.setAttribute("value", "200");
    mxUtils.write(dpi200Option, "200dpi");
    dpiSelect.appendChild(dpi200Option);
    return dpiSelect;
  }

  appendDpi300(dpiSelect) {
    var dpi300Option = document.createElement("option");
    dpi300Option.setAttribute("value", "300");
    mxUtils.write(dpi300Option, "300dpi");
    dpiSelect.appendChild(dpi300Option);
    return dpiSelect;
  }

  appendDpi400(dpiSelect) {
    var dpi400Option = document.createElement("option");
    dpi400Option.setAttribute("value", "400");
    mxUtils.write(dpi400Option, "400dpi");
    dpiSelect.appendChild(dpi400Option);
    return dpiSelect;
  }

  appendDpiCustom(dpiSelect) {
    var dpiCustOption = document.createElement("option");
    dpiCustOption.setAttribute("value", "custom");
    mxUtils.write(dpiCustOption, mxResources.get("custom"));
    dpiSelect.appendChild(dpiCustOption);
    return dpiSelect;
  }

  customDpi: any;

  createCustomDpiInput() {
    const customDpi = document.createElement("input");
    customDpi.style.width = "180px";
    customDpi.style.display = "none";
    customDpi.setAttribute("value", "100");
    customDpi.setAttribute("type", "number");
    customDpi.setAttribute("min", "50");
    customDpi.setAttribute("step", "50");
    this.customDpi = customDpi;
    return customDpi;
  }

  zoomInput: any;

  value: any; // delegate
  style: any; // delegate

  addDpiSelectChangeHandler() {
    const { dpiSelect, customDpi, zoomUserChanged, zoomInput } = this;

    mxEvent.addListener(dpiSelect, "change", () => {
      if (this.value == "custom") {
        this.style.display = "none";
        customDpi.style.display = "";
        customDpi.focus();
      } else {
        customDpi.value = this.value;

        if (!zoomUserChanged) {
          zoomInput.value = this.value;
        }
      }
    });
  }

  addCustomDpiChangeHandler() {
    const { customDpi, zoomUserChanged, zoomInput } = this;
    mxEvent.addListener(customDpi, "change", () => {
      var dpi = parseInt(customDpi.value);

      if (isNaN(dpi) || dpi <= 0) {
        customDpi.style.backgroundColor = "red";
      } else {
        customDpi.style.backgroundColor = "";

        if (!zoomUserChanged) {
          zoomInput.value = dpi;
        }
      }
    });
  }

  appendDpiControlToBody(row) {
    const td = this.createCell();
    const { dpiSelect, customDpi } = this;
    td.appendChild(dpiSelect);
    td.appendChild(customDpi);
    row.appendChild(td);
    return this.appendRow(row);
  }

  dpiSelect: any;

  append() {
    const row = this.createRow();
    this.appendDpiDisplay(row);

    const dpiSelect = document.createElement("select");
    dpiSelect.style.width = "180px";
    this.dpiSelect = dpiSelect;

    this.appendDpi100(dpiSelect);
    this.appendDpi200(dpiSelect);
    this.appendDpi300(dpiSelect);
    this.appendDpi400(dpiSelect);
    this.appendDpiCustom(dpiSelect);

    this.createCustomDpiInput();
  }
}
