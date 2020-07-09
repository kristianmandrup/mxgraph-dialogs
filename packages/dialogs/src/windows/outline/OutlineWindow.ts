import mx from "@mxgraph-app/mx";
import { IDimensions } from "../types";
const {
  mxConstants,
  mxWindow,
  mxUtils,
  mxResources,
  mxRectangle,
  mxEvent,
} = mx;

/**
 *
 */
export class OutlineWindow {
  window: any;
  editorUi: any;
  div: any;
  _outline: any;

  resizeListener = () => {
    var x = this.window.getX();
    var y = this.window.getY();

    this.window.setLocation(x, y);
  };

  destroy = () => {
    mxEvent.removeListener(window, "resize", this.resizeListener);
    this.window.destroy();
    this.outline.destroy();
  };

  get outline(): any {
    this._outline = this._outline || this.editorUi.createOutline(this.window);
    return this._outline;
  }

  get graph() {
    return this.editorUi.editor.graph;
  }

  defaults = {
    dimensions: {
      x: 0,
      y: 0,
      w: 600,
      h: 400,
    },
  };

  setWindow(div, dimensions) {
    const { x, y, w, h } = dimensions;
    this.window = new mxWindow(
      mxResources.get("outline"),
      div,
      x,
      y,
      w,
      h,
      true,
      true
    );
    this.window.minimumSize = new mxRectangle(0, 0, 80, 80);
    this.window.destroyOnClose = false;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);

    this.window.setLocation = function (x, y) {
      var iw =
        window.innerWidth ||
        document.body.clientWidth ||
        document.documentElement.clientWidth;
      var ih =
        window.innerHeight ||
        document.body.clientHeight ||
        document.documentElement.clientHeight;

      x = Math.max(0, Math.min(x, iw - this.table.clientWidth));
      y = Math.max(0, Math.min(y, ih - this.table.clientHeight - 48));

      if (this.getX() != x || this.getY() != y) {
        mxWindow.prototype.setLocation.apply(this, [x, y]);
      }
    };

    mxEvent.addListener(window, "resize", this.resizeListener);

    this.window.addListener(mxEvent.RESIZE, () => {
      const { outline } = this;
      outline.update(false);
      outline.outline.sizeDidChange();
    });

    this.window.addListener(mxEvent.SHOW, () => {
      const { outline } = this;
      this.window.fit();
      outline.suspended = false;
      outline.outline.refresh();
      outline.update();
    });

    this.window.addListener(mxEvent.HIDE, () => {
      const { outline } = this;
      outline.suspended = true;
    });

    this.window.addListener(mxEvent.NORMALIZE, () => {
      const { outline } = this;
      outline.suspended = false;
      outline.update();
    });

    this.window.addListener(mxEvent.MINIMIZE, () => {
      const { outline } = this;
      outline.suspended = true;
    });
  }

  createDiv() {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.border = "1px solid whiteSmoke";
    div.style.overflow = "hidden";
    this.div = div;
    return div;
  }

  constructor(editorUi, dimensions: IDimensions = {}) {
    dimensions = {
      ...this.defaults.dimensions,
      ...dimensions,
    };

    this.editorUi = editorUi;

    const div = this.createDiv();
    this.setWindow(div, dimensions);

    const { outline } = this;
    this.outlineCreateGraphHandler();

    outline.init(div);
    this.addEditorListeners();
    this.configureSVG();
  }

  outlineCreateGraphHandler() {
    const { outline, graph, div } = this;
    var outlineCreateGraph = outline.createGraph;
    outline.createGraph = (_container) => {
      var g = outlineCreateGraph.apply(this, arguments);
      g.gridEnabled = false;
      g.pageScale = graph.pageScale;
      g.pageFormat = graph.pageFormat;
      g.background =
        graph.background == null || graph.background == mxConstants.NONE
          ? graph.defaultPageBackgroundColor
          : graph.background;
      g.pageVisible = graph.pageVisible;

      var current = mxUtils.getCurrentStyle(graph.container);
      div.style.backgroundColor = current.backgroundColor;
      return g;
    };
  }

  configureSVG() {
    const { editorUi, outline } = this;
    if (outline.outline.dialect == mxConstants.DIALECT_SVG) {
      var zoomInAction = editorUi.actions.get("zoomIn");
      var zoomOutAction = editorUi.actions.get("zoomOut");

      mxEvent.addMouseWheelListener((evt, up) => {
        var outlineWheel = false;
        var source = mxEvent.getSource(evt);

        while (source != null) {
          if (source == outline.outline.view.canvas.ownerSVGElement) {
            outlineWheel = true;
            break;
          }

          source = source.parentNode;
        }

        if (outlineWheel) {
          if (up) {
            zoomInAction.funct();
          } else {
            zoomOutAction.funct();
          }
        }
      }, undefined);
    }
  }

  addEditorListeners() {
    const { update, editorUi, outline } = this;
    editorUi.editor.addListener("resetGraphView", update);
    editorUi.addListener("pageFormatChanged", update);
    editorUi.addListener("backgroundColorChanged", update);
    editorUi.addListener("backgroundImageChanged", update);
    editorUi.addListener("pageViewChanged", function () {
      update();
      outline.update(true);
    });
  }

  update = () => {
    const { outline, graph, div } = this;
    outline.outline.pageScale = graph.pageScale;
    outline.outline.pageFormat = graph.pageFormat;
    outline.outline.pageVisible = graph.pageVisible;
    outline.outline.background =
      graph.background == null || graph.background == mxConstants.NONE
        ? graph.defaultPageBackgroundColor
        : graph.background;

    var current = mxUtils.getCurrentStyle(graph.container);
    div.style.backgroundColor = current.backgroundColor;

    if (
      graph.view.backgroundPageShape != null &&
      outline.outline.view.backgroundPageShape != null
    ) {
      outline.outline.view.backgroundPageShape.fill =
        graph.view.backgroundPageShape.fill;
    }

    outline.outline.refresh();
  };
}
