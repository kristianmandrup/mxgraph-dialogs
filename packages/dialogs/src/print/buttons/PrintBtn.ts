import mx from "@mxgraph-app/mx";
import { BasePrintBtn } from "./BasePrintBtn";
const { mxUtils, mxResources } = mx;

export class PrintBtn extends BasePrintBtn {
  preview: any;

  constructor(dialog: any) {
    super(dialog);
    this.preview = this.createPreview();
  }

  createPrintBtn() {
    const { editorUi, preview, previewEnabled } = this.preview;
    var printBtn = mxUtils.button(
      mxResources.get(!previewEnabled ? "ok" : "print"),
      () => {
        editorUi.hideDialog();
        preview(true);
      }
    );
    printBtn.className = "geBtn gePrimaryBtn";
    return printBtn;
  }
}
