import mx from "@mxgraph-app/mx";
import { BaseChangeManager } from "./BaseChangeManager";
const { mxEvent } = mx;

export class ZoomChangeManager extends BaseChangeManager {
  zoomUserChanged = false;

  addChangeHandler() {
    const { zoomInput, heightInput, widthInput } = this.controls;
    const { width, height } = this.size;

    mxEvent.addListener(zoomInput, "change", () => {
      this.zoomUserChanged = true;
      var s = Math.max(0, parseFloat(zoomInput.value) || 100) / 100;
      zoomInput.value = parseFloat((s * 100).toFixed(2));

      if (width > 0) {
        widthInput.value = Math.floor(width * s);
        heightInput.value = Math.floor(height * s);
      } else {
        zoomInput.value = "100";
        widthInput.value = width;
        heightInput.value = height;
      }

      this.validateSize();
    });
  }
}
