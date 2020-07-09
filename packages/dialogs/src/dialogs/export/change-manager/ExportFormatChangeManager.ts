import { ExportDialog } from "../ExportDialog";
import { BaseChangeManager } from "./BaseChangeManager";

export class ExportFormatChangeManager extends BaseChangeManager {
  constructor(dialog: ExportDialog) {
    super(dialog);
  }

  // Handles changes in the export format
  formatChanged = () => {
    const {
      nameInput,
      imageFormatSelect,
      zoomInput,
      widthInput,
      heightInput,
      borderInput,
      transparentCheckbox,
      dpiSelect,
      customDpi,
    } = this.controls;
    var name = nameInput.value;
    var dot = name.lastIndexOf(".");

    if (dot > 0) {
      nameInput.value = name.substring(0, dot + 1) + imageFormatSelect.value;
    } else {
      nameInput.value = name + "." + imageFormatSelect.value;
    }

    if (imageFormatSelect.value === "xml") {
      zoomInput.setAttribute("disabled", "true");
      widthInput.setAttribute("disabled", "true");
      heightInput.setAttribute("disabled", "true");
      borderInput.setAttribute("disabled", "true");
    } else {
      zoomInput.removeAttribute("disabled");
      widthInput.removeAttribute("disabled");
      heightInput.removeAttribute("disabled");
      borderInput.removeAttribute("disabled");
    }

    if (
      imageFormatSelect.value === "png" ||
      imageFormatSelect.value === "svg"
    ) {
      transparentCheckbox.removeAttribute("disabled");
    } else {
      transparentCheckbox.setAttribute("disabled", "disabled");
    }

    if (imageFormatSelect.value === "png") {
      dpiSelect.removeAttribute("disabled");
      customDpi.removeAttribute("disabled");
    } else {
      dpiSelect.setAttribute("disabled", "disabled");
      customDpi.setAttribute("disabled", "disabled");
    }
  };
}
