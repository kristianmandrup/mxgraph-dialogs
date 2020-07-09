// import { EditorUI } from "ui/EditorUI";
import { Dialog } from "../../../dialog/Dialog";
import mx from "@mxgraph-app/mx";
import { IDimensions } from "../types";
import { LayerRefreshManager } from "./LayerRefreshManager";
import { LayerDuplicator } from "./LayerDuplicator";
import { LayerRemover } from "./LayerRemover";
import { LayerData } from "./LayerData";
import { LayerInserter } from "./LayerInserter";
import { LayerAdder } from "./LayerAdder";
import { LayersWindowUI } from "./LayersWindowUI";
const { mxWindow, mxResources, mxClient, mxEvent, mxRectangle } = mx;
/**
 *
 */
export class LayersWindow {
  window: any; // mxWindow (set in constructor)
  refreshLayers: any;

  editorUi: any;
  listDiv: any;

  compactUi = true; // EditorUI.compactUi
  checkmarkImage = true; // Editor.checkmarkImage
  div: any;
  ldiv: any;

  link: any;
  insertLink: any;
  removeLink: any;
  addLink: any;
  duplicateLink: any;
  dataLink: any;

  defaults = {
    dimensions: {
      x: 0,
      y: 0,
      w: 600,
      h: 400,
    },
  };

  selectionLayer: any;

  dropIndex: number = 0;
  layerCount: number = 0;

  get graph() {
    return this.editorUi.graph;
  }

  get documentMode() {
    return this.editorUi.documentMode;
  }

  layerRefresher: LayerRefreshManager;
  layerDuplicator: LayerDuplicator;
  layerRemover: LayerRemover;
  layerData: LayerData;
  layerInserter: LayerInserter;
  layerAdder: LayerAdder;

  windowUi: LayersWindowUI;

  dimensions: IDimensions;

  // TODO: extract into multiple smaller methods!
  constructor(editorUi, dimensions: IDimensions = {}) {
    this.dimensions = {
      ...this.defaults.dimensions,
      ...dimensions,
    };
    this.editorUi = editorUi;
    this.createLink();

    this.layerRefresher = new LayerRefreshManager(this);
    this.layerDuplicator = new LayerDuplicator(this);
    this.layerRemover = new LayerRemover(this);
    this.layerData = new LayerData(this);
    this.layerInserter = new LayerInserter(this);
    this.layerAdder = new LayerAdder(this);
    this.windowUi = new LayersWindowUI(this);

    this.createDivs();
    this.addClickHandlers();
    this.addDragDropHandlers();

    this.refresh();
    this.addGraphChangeHandlers();

    mxEvent.addListener(window, "resize", this.resizeListener);
  }

  initWindow() {
    const window = this.createWindow();
    this.setWindowProperties();

    this.window.addListener(mxEvent.SHOW, () => {
      this.window.fit();
    });

    // Make refresh available via instance
    this.refreshLayers = this.refresh;

    window.setLocation = (x, y) => {
      var iw =
        window.innerWidth ||
        document.body.clientWidth ||
        document.documentElement.clientWidth;
      var ih =
        window.innerHeight ||
        document.body.clientHeight ||
        document.documentElement.clientHeight;

      x = Math.max(0, Math.min(x, iw - window.table.clientWidth));
      y = Math.max(0, Math.min(y, ih - window.table.clientHeight - 48));

      if (window.getX() != x || window.getY() != y) {
        mxWindow.prototype.setLocation.apply(this, [x, y]);
      }
    };
  }

  setWindowProperties() {
    const { window } = this;
    window.minimumSize = new mxRectangle(0, 0, 120, 120);
    window.destroyOnClose = false;
    window.setMaximizable(false);
    window.setResizable(true);
    window.setClosable(true);
    window.setVisible(true);
  }

  createWindow() {
    // main div
    const { dimensions, div } = this;
    const { x, y, w, h } = dimensions;

    const window: any = new mxWindow(
      mxResources.get("layers"),
      div,
      x,
      y,
      w,
      h,
      true,
      true
    );
    this.window = window;
    return window;
  }

  refresh = () => {
    return this.layerRefresher.refresh;
  };

  get backdropColor() {
    return Dialog.backdropColor;
  }

  createDivs() {
    this.windowUi.createDivs();
  }

  addDragDropHandlers() {
    const { div } = this;
    mxEvent.addListener(div, "dragover", (evt) => {
      evt.dataTransfer.dropEffect = "move";
      this.dropIndex = 0;
      evt.stopPropagation();
      evt.preventDefault();
    });

    // Workaround for "no element found" error in FF
    mxEvent.addListener(div, "drop", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
    });
  }

  addClickHandlers() {
    this.addAddLinkClickHandler();
    this.addDataLinkClickHandler();
    this.addDuplicateLinkClickHandler();
    this.addInsertLinkClickHandler();
    this.addRemoveLinkClickHandler();
  }

  addInsertLinkClickHandler() {
    this.layerInserter.addClickHandler();
  }

  addRemoveLinkClickHandler() {
    this.layerRemover.addClickHandler();
  }

  addAddLinkClickHandler() {
    this.layerAdder.addClickHandler();
  }

  addDuplicateLinkClickHandler() {
    this.layerDuplicator.addClickHandler();
  }

  addDataLinkClickHandler() {
    this.layerData.addClickHandler();
  }

  createLink() {
    var link = document.createElement("a");
    link.className = "geButton";

    if (mxClient.IS_QUIRKS) {
      link.style.filter = "none";
    }
    this.link = link;
  }

  addGraphChangeHandlers() {
    const { graph, insertLink } = this;
    graph.model.addListener(mxEvent.CHANGE, () => {
      this.refresh();
    });

    graph.selectionModel.addListener(mxEvent.CHANGE, function () {
      if (graph.isSelectionEmpty()) {
        insertLink.className = "geButton mxDisabled";
      } else {
        insertLink.className = "geButton";
      }
    });
  }

  get links() {
    return {
      remove: this.layerRemover.link,
      add: this.layerAdder.link,
      insert: this.layerInserter.link,
      duplicate: this.layerDuplicator.link,
      data: this.layerData.link,
    };
  }

  resizeListener = () => {
    var x = this.window.getX();
    var y = this.window.getY();

    this.window.setLocation(x, y);
  };

  init() {
    const { listDiv } = this;
    listDiv.scrollTop = listDiv.scrollHeight - listDiv.clientHeight;
  }

  destroy() {
    mxEvent.removeListener(window, "resize", this.resizeListener);
    this.window.destroy();
  }
}
