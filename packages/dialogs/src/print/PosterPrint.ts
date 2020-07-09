import mx from "@mxgraph-app/mx";
import { BasePrintDialogControl } from "./BasePrintDialogControl";
const { mxEvent, mxUtils, mxResources } = mx;

export class PosterPrint extends BasePrintDialogControl {
  span: any;

  createSpan() {
    const { td } = this;
    var span = document.createElement("span");
    mxUtils.write(span, " " + mxResources.get("posterPrint") + ":");
    td.appendChild(span);
    this.span = span;
    return span;
  }

  addClickHandler() {
    const { span, onePageCheckBox, pageCountCheckBox } = this;
    mxEvent.addListener(span, "click", function (evt) {
      pageCountCheckBox.checked = !pageCountCheckBox.checked;
      onePageCheckBox.checked = !pageCountCheckBox.checked;
      mxEvent.consume(evt);
    });
  }
}
