import mx from "@mxgraph-app/mx";
import { BasePrintBtn } from "../BasePrintBtn";
const { mxUtils, mxResources } = mx;

export class PreviewBtn extends BasePrintBtn {
  createBtn() {
    const { editorUi, preview, previewEnabled } = this.preview;
    if (!previewEnabled) return;
    var previewBtn = mxUtils.button(mxResources.get("preview"), () => {
      editorUi.hideDialog();
      preview(false);
    });
    previewBtn.className = "geBtn";
    // td.appendChild(previewBtn);
  }
}
