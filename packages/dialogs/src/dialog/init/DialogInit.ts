import { Dialog } from "../Dialog";
import mx from "@mxgraph-app/mx";
const {
  mxEventObject,
  mxEvent,
  mxResources,
  mxDivResizer,
  mxUtils,
  mxClient,
} = mx;

interface ISize {
  width: number;
  height: number;
}

interface IPos {
  top: number;
  left: number;
}

/**
 * Class used to initialize Dialog class
 */
export class DialogInit {
  dialog: Dialog;
  ui: any;
  element: any;
  container: any; // or set on Dialog?
  dialogImg: any;
  onDialogClose: any;

  position: IPos = {
    top: 0,
    left: 0,
  };
  size: ISize = {
    width: 0,
    height: 0,
  };

  opts: any;

  constructor(dialog: Dialog, opts: any = {}) {
    this.dialog = dialog;
    this.element = opts.element;
    this.ui = opts.ui;
    this.opts = opts;
  }

  set zIndex(value) {
    this.ui.zIndex = value;
  }

  get dx() {
    const { documentMode } = this.dialog;
    let dx = 0;
    if (mxClient.IS_VML && (documentMode == null || documentMode < 8)) {
      // Adds padding as a workaround for box model in older IE versions
      // This needs to match the total padding of geDialog in CSS
      dx = 80;
    }
    return dx;
  }

  _ds: any; // width, height

  get ds(): any {
    this._ds = this._ds || mxUtils.getDocumentSize();
    return this._ds;
  }

  get dh() {
    return this.ds.height;
  }

  set width(w) {
    this.size.width = w;
  }

  set height(h) {
    this.size.height = h;
  }

  get left() {
    const { ds, size } = this;
    const { width } = size;
    return Math.max(1, Math.round((ds.width - width - 64) / 2));
  }

  get top() {
    const { dh, ui, size } = this;
    const { height } = size;
    return Math.max(1, Math.round((dh - height - ui.footerHeight) / 3));
  }

  setSize() {
    const { dx, size } = this;
    size.width += dx;
    size.height += dx;
  }

  get width() {
    return this.size.width;
  }

  setWidth() {
    const { width } = this;
    this.width =
      document.body != null
        ? Math.min(width, document.body.scrollWidth - 64)
        : width;
  }

  setHeight() {
    const { height, dh } = this;
    this.height = Math.min(height, dh - 64);
  }

  dsDialogOffsetFix() {
    // Workaround for print dialog offset in viewer lightbox
    if (!window.innerHeight) return;
    this._ds.height = window.innerHeight;
  }

  ensureWindowHeightFit() {
    // Keeps window size inside available space
    if (!mxClient.IS_QUIRKS) {
      this.element.style.maxHeight = "100%";
    }
  }

  init() {
    let {
      modal,
      closable,
      onClose,
      noScroll,
      transparent,
      // onResize,
      ignoreBgClick,
      ensureWindowHeightFit,
      dsDialogOffsetFix,
      ui,
      bg,
      bgOpacity,
    } = this.opts;
    const { getPosition } = this.dialog;

    this.setSize();

    const { dx, dh, setWidth, setHeight } = this;
    // var w0 = w;
    // var h0 = h;

    dsDialogOffsetFix();
    ensureWindowHeightFit();

    setWidth();
    setHeight();

    // Increments zIndex to put subdialogs and background over existing dialogs and background
    if (ui.dialogs.length > 0) {
      this.zIndex += ui.dialogs.length * 2;
    }

    if (bg == null) {
      bg = ui.createDiv("background");
      bg.style.position = "absolute";
      bg.style.background = Dialog.backdropColor;
      bg.style.height = dh + "px";
      bg.style.right = "0px";
      bg.style.zIndex = this.zIndex - 2;

      mxUtils.setOpacity(bg, bgOpacity);

      if (mxClient.IS_QUIRKS) {
        new mxDivResizer(bg, null);
      }
    }

    var origin = mxUtils.getDocumentScrollOrigin(document);
    bg.style.left = origin.x + "px";
    bg.style.top = origin.y + "px";

    const { size, position, element } = this;
    position.left += origin.x;
    position.top += origin.y;

    if (modal) {
      document.body.appendChild(bg);
    }

    var div = ui.createDiv(transparent ? "geTransDialog" : "geDialog");
    var pos = getPosition(position.left, position.top, size.width, size.height);
    position.left = pos.x;
    position.top = pos.y;

    const { left, top } = position;
    const { width, height } = size;

    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.left = left + "px";
    div.style.top = top + "px";
    div.style.zIndex = this.zIndex;

    div.appendChild(element);
    document.body.appendChild(div);

    // Adds vertical scrollbars if needed
    if (!noScroll && element.clientHeight > div.clientHeight - 64) {
      element.style.overflowY = "auto";
    }

    if (closable) {
      var img = document.createElement("img");

      img.setAttribute("src", Dialog.prototype.closeImage);
      img.setAttribute("title", mxResources.get("close"));
      img.className = "geDialogClose";
      img.style.top = top + 14 + "px";
      img.style.left = left + width + 38 - dx + "px";
      img.style.zIndex = this.zIndex;

      mxEvent.addListener(img, "click", () => {
        ui.hideDialog(true);
      });

      document.body.appendChild(img);
      this.dialogImg = img;

      if (!ignoreBgClick) {
        var mouseDownSeen = false;

        mxEvent.addGestureListeners(
          bg,
          (_evt) => {
            mouseDownSeen = true;
          },
          undefined,
          undefined
        ),
          null,
          (_evt) => {
            if (mouseDownSeen) {
              ui.hideDialog(true);
              mouseDownSeen = false;
            }
          };
      }
    }

    mxEvent.addListener(window, "resize", this.resizeListener);

    this.onDialogClose = onClose;
    this.container = div;

    ui.editor.fireEvent(new mxEventObject("showDialog"));

    // this.dialogResizer = new DialogResizer(this);
  }

  resizeListener = () => {};
}
