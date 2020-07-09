import { BaseDialogBtn } from "../../base/BaseDialogBtn";
import mx from "@mxgraph-app/mx";
import { ExportDialog } from "../ExportDialog";
const { mxConstants, mxUtils, mxResources } = mx;

export class SaveBtn extends BaseDialogBtn {
  get controls() {
    return this.dialog.inputs.controls;
  }

  get graph() {
    return this.dialog.graph;
  }

  createBtn() {
    const { graph, ui } = this;
    const {
      nameInput,
      imageFormatSelect,
      zoomInput,
      borderInput,
      transparentCheckbox,
      customDpi,
    } = this.controls;

    var saveBtn = mxUtils.button(mxResources.get("export"), () => {
      if (parseInt(zoomInput.value) <= 0) {
        mxUtils.alert(mxResources.get("drawingEmpty"));
      } else {
        var name = nameInput.value;
        var format = imageFormatSelect.value;
        var s = Math.max(0, parseFloat(zoomInput.value) || 100) / 100;
        var b = Math.max(0, parseInt(borderInput.value));
        var bg = graph.background;
        var dpi = Math.max(1, parseInt(customDpi.value));

        if (
          (format == "svg" || format == "png") &&
          transparentCheckbox.checked
        ) {
          bg = null;
        } else if (bg == null || bg == mxConstants.NONE) {
          bg = "#ffffff";
        }

        ExportDialog.lastBorderValue = b;
        ExportDialog.exportFile(ui, name, format, bg, s, b, dpi);
      }
    });
    saveBtn.className = "geBtn gePrimaryBtn";
  }
}
