import mx from "@mxgraph-app/mx";
import { BaseChangeManager } from "./BaseChangeManager";
const { mxEvent } = mx;

export class HeightChangeManager extends BaseChangeManager {
  addChangeHandler() {
    const { zoomInput, heightInput, widthInput } = this.controls;
    const { width, height } = this.size;
    mxEvent.addListener(heightInput, "change", () => {
      var s = parseInt(heightInput.value) / height;

      if (s > 0) {
        zoomInput.value = parseFloat((s * 100).toFixed(2));
        widthInput.value = Math.floor(width * s);
      } else {
        zoomInput.value = "100";
        widthInput.value = width;
        heightInput.value = height;
      }

      this.validateSize();
    });
  }
}
