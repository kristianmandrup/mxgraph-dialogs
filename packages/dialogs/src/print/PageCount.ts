import mx from "@mxgraph-app/mx";
import { BasePrintDialogControl } from "./BasePrintDialogControl";
const { mxEvent, mxUtils, mxResources } = mx;

export class PageCount extends BasePrintDialogControl {
  elem: any;
  pageCountInput: any;

  // this.pageCountInput = pageCountInput

  createElement() {
    const { pageCountInput } = this;
    const td = document.createElement("td");
    td.style.fontSize = "10pt";
    td.appendChild(pageCountInput);
    mxUtils.write(td, " " + mxResources.get("pages") + " (max)");
    this.elem = td;
    return td;
  }

  addClickHandler() {
    const { onePageCheckBox, pageCountCheckBox, pageCountInput } = this;
    mxEvent.addListener(pageCountCheckBox, "change", function () {
      if (pageCountCheckBox.checked) {
        pageCountInput.removeAttribute("disabled");
      } else {
        pageCountInput.setAttribute("disabled", "disabled");
      }

      onePageCheckBox.checked = !pageCountCheckBox.checked;
    });
  }
}
