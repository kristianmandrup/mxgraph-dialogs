import { Dialog } from "../Dialog";
import mx from "@mxgraph-app/mx";
const { mxUtils } = mx;
/**
 * Class used to resize Dialog
 */
export class DialogResizer {
  dialog: Dialog;
  ui: any;

  bounds: any;
  position: any = {};
  size: any = {};

  w0: any;
  h0: any;
  w: any;
  h: any;

  constructor(dialog: Dialog) {
    this.dialog = dialog;
    const { editorUi, w, h, h0, w0 } = dialog;
    this.ui = editorUi;
    this.h0 = h0;
    this.w0 = w0;
    this.w = w;
    this.h = h;
  }

  set left(left) {
    this.position.left = left;
    this.updateBounds();
  }

  set top(top) {
    this.position.top = top;
    this.updateBounds();
  }

  set width(width) {
    this.size.width = width;
    this.updateBounds();
  }

  set height(height) {
    this.size.height = height;
    this.updateBounds();
  }

  updateBounds() {
    const { position, size } = this;
    this.bounds = {
      ...position,
      ...size,
    };
  }

  get dh() {
    return this.dialog.dh;
  }

  get background() {
    return this.dialog.background;
  }

  get ds() {
    return mxUtils.getDocumentSize();
  }

  get calcLeft() {
    const { ds, w } = this;
    return Math.max(1, Math.round((ds.width - w - 64) / 2));
  }

  get calcTop() {
    const { ui, dh, h } = this;
    return Math.max(1, Math.round((dh - h - ui.footerHeight) / 3));
  }

  setLeft() {
    this.left = this.calcLeft;
  }

  setTop() {
    this.top = this.calcTop;
  }

  setWidth() {
    const { w0 } = this;
    this.width =
      document.body != null ? Math.min(w0, document.body.scrollWidth - 64) : w0;
  }

  setHeight() {
    const { h0, dh } = this;
    this.height = Math.min(h0, dh - 64);
  }

  setOnResizeSize() {
    const { onResize } = this.dialog;
    if (onResize) {
      var newWH = onResize();
      if (newWH) {
        this.w0 = this.w = newWH.w;
        this.h0 = this.h = newWH.h;
      }
    }
  }

  setPosition() {
    this.setLeft();
    this.setTop();

    const { getPosition } = this.dialog;
    const { left, top, width, height } = this.bounds;
    var pos = getPosition(left, top, width, height);
    this.left = pos.x;
    this.top = pos.y;
  }

  setBackgroundHeight() {
    let { background, ds, dh } = this;
    dh = ds.height;
    background.style.height = dh + "px";
  }

  // TODO: refactor
  resizeListener() {
    this.setOnResizeSize();
    this.setBackgroundHeight();
    this.setPosition();
    this.addVerticalScrollbars();
  }

  hasVerticalOverflow() {
    let { div, noScroll, element } = this.dialog;
    return !noScroll && element.clientHeight > div.clientHeight - 64;
  }

  addVerticalScrollbars() {
    const { element } = this.dialog;
    // Adds vertical scrollbars if needed
    if (!this.hasVerticalOverflow) return;
    element.style.overflowY = "auto";
  }

  setDialogImg() {
    const { dx, dialogImg } = this.dialog;
    const { top, left, width } = this.bounds;
    if (!dialogImg) return;

    dialogImg.style.top = top + 14 + "px";
    dialogImg.style.left = left + width + 38 - dx + "px";
  }

  setDivDimensions(div) {
    const { left, top, width, height } = this.bounds;
    div.style.left = left + "px";
    div.style.top = top + "px";
    div.style.width = width + "px";
    div.style.height = height + "px";
  }
}
