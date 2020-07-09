import { Dialog } from "../Dialog";
import mx from "@mxgraph-app/mx";
const { mxUtils } = mx;
/**
 * Class used to resize Dialog
 */
export class DialogResizer {
  dialog: Dialog;
  constructor(dialog: Dialog) {
    this.dialog = dialog;
  }

  resizeListener() {
    let {
      editorUi,
      onResize,
      w0,
      h0,
      dh,
      dx,
      left,
      top,
      w,
      h,
      div,
      noScroll,
      elt,
      bg,
      getPosition,
      dialogImg,
    } = this.dialog;
    if (onResize) {
      var newWH = onResize();

      if (newWH) {
        w0 = w = newWH.w;
        h0 = h = newWH.h;
      }
    }

    var ds = mxUtils.getDocumentSize();
    dh = ds.height;
    bg.style.height = dh + "px";

    left = Math.max(1, Math.round((ds.width - w - 64) / 2));
    top = Math.max(1, Math.round((dh - h - editorUi.footerHeight) / 3));
    w =
      document.body != null ? Math.min(w0, document.body.scrollWidth - 64) : w0;
    h = Math.min(h0, dh - 64);

    var pos = getPosition(left, top, w, h);
    left = pos.x;
    top = pos.y;

    div.style.left = left + "px";
    div.style.top = top + "px";
    div.style.width = w + "px";
    div.style.height = h + "px";

    // Adds vertical scrollbars if needed
    if (!noScroll && elt.clientHeight > div.clientHeight - 64) {
      elt.style.overflowY = "auto";
    }

    if (dialogImg) {
      dialogImg.style.top = top + 14 + "px";
      dialogImg.style.left = left + w + 38 - dx + "px";
    }
  }
}
