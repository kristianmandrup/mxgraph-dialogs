import mx from "@mxgraph-app/mx";
import { BasePrintDialogControl } from "./BasePrintDialogControl";
const { mxEvent, mxUtils, mxResources } = mx;

export class OnePage extends BasePrintDialogControl {
  span: any;

  get pageCountCheckBox() {
    return this.dialog.pageCountCheckBox;
  }

  get onePageCheckBox() {
    return this.dialog.onePageCheckBox;
  }

  createSpan() {
    var span = document.createElement("span");
    mxUtils.write(span, " " + mxResources.get("fitPage"));
    this.span = span;
    return span;
  }

  append() {
    const { onePageCheckBox } = this;
    const td = document.createElement("td");
    td.setAttribute("colspan", "2");
    td.style.fontSize = "10pt";
    td.appendChild(onePageCheckBox);
    const span = this.createSpan();
    td.appendChild(span);
  }

  addActionHandlers() {
    this.addSpanClickHandler();
    this.addOnePageCheckBoxChangeHandler();
  }

  addSpanClickHandler() {
    const { span, onePageCheckBox, pageCountCheckBox } = this;
    mxEvent.addListener(span, "click", (evt) => {
      onePageCheckBox.checked = !onePageCheckBox.checked;
      pageCountCheckBox.checked = !onePageCheckBox.checked;
      mxEvent.consume(evt);
    });
  }

  addOnePageCheckBoxChangeHandler() {
    const { pageCountCheckBox, onePageCheckBox } = this;
    mxEvent.addListener(onePageCheckBox, "change", () => {
      pageCountCheckBox.checked = !onePageCheckBox.checked;
    });
  }
}
