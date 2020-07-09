import mx from "@mxgraph-app/mx";
import { BaseChangeManager } from "./BaseChangeManager";
const { mxEvent } = mx;

export class ZoomChangeManager extends BaseChangeManager {
  addChangeHandler() {
    const { zoomInput, heightInput, widthInput } = this.controls;
    const { width, height } = this.size;

    mxEvent.addListener(widthInput, "change", () => {
      var s = parseInt(widthInput.value) / width;

      if (s > 0) {
        zoomInput.value = parseFloat((s * 100).toFixed(2));
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
