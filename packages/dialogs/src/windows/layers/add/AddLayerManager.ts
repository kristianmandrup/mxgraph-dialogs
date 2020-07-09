import mx from "@mxgraph-app/mx";
import { LayersWindow } from "../LayersWindow";
import { Dialog } from "../../../../dialog/Dialog";
import { LayerRenamer } from "../LayerRenamer";
const { mxUtils, mxResources, mxClient, mxEvent } = mx;

export class AddLayerManager {
  layersWindow: LayersWindow;
  graph: any;

  ldiv: any;
  left: any;
  right: any;
  btn: any;
  inp: any;
  img1: any;
  img2: any;

  dragSource: any;
  renamer: LayerRenamer;

  get backdropColor() {
    return this.layersWindow.backdropColor;
  }

  set dropIndex(index) {
    this.layersWindow.dropIndex = index;
  }

  set selectionLayer(layer) {
    this.layersWindow.selectionLayer = layer;
  }

  constructor(layersWindow: LayersWindow) {
    this.layersWindow = layersWindow;
    this.graph = layersWindow.graph;
    this.renamer = new LayerRenamer(layersWindow);
  }

  refresh() {
    this.layersWindow.refresh();
  }

  get documentMode() {
    return this.layersWindow.documentMode;
  }

  get layerCount() {
    return this.layersWindow.layerCount;
  }

  get listDiv() {
    return this.layersWindow.listDiv;
  }

  get lockedImage() {
    return Dialog.prototype.lockedImage;
  }

  get unlockedImage() {
    return Dialog.prototype.unlockedImage;
  }

  addLayer = (index, label, child, defaultParent) => {
    this.createLayerDiv(label);
    this.addLayerDivDragHandlers(this.ldiv, { index, child });
    this.createLeft();
    this.createBtn(child);

    const { ldiv, left, btn, graph } = this;
    left.appendChild(btn);
    this.createInput(child);
    const { inp, listDiv } = this;
    left.appendChild(inp);

    if (graph.model.isVisible(child)) {
      inp.setAttribute("checked", "checked");
      inp.defaultChecked = true;
    }

    mxEvent.addListener(inp, "click", (evt) => {
      graph.model.setVisible(child, !graph.model.isVisible(child));
      mxEvent.consume(evt);
    });

    mxUtils.write(left, label);
    ldiv.appendChild(left);

    this.connectLayerToGraph({ child, index });

    mxEvent.addListener(ldiv, "dblclick", (evt) => {
      var nodeName = mxEvent.getSource(evt).nodeName;

      if (nodeName != "INPUT" && nodeName != "IMG") {
        this.renameLayer(child);
        mxEvent.consume(evt);
      }
    });

    if (graph.getDefaultParent() == child) {
      ldiv.style.background =
        Dialog.backdropColor == "white" ? "#e6eff8" : "#505759";
      ldiv.style.fontWeight = graph.isEnabled() ? "bold" : "";
      this.selectionLayer = child;
    } else {
      mxEvent.addListener(ldiv, "click", (_evt) => {
        if (graph.isEnabled()) {
          graph.setDefaultParent(defaultParent);
          graph.view.setCurrentRoot(null);
          this.refresh();
        }
      });
    }

    listDiv.appendChild(ldiv);
  };

  renameLayer(child) {
    this.renamer.renameLayer(child);
  }

  connectLayerToGraph({ child, index }) {
    const { graph, layerCount, documentMode, ldiv } = this;
    if (graph.isEnabled()) {
      // Fallback if no drag and drop is available
      if (
        mxClient.IS_TOUCH ||
        mxClient.IS_POINTER ||
        mxClient.IS_VML ||
        (mxClient.IS_IE && this.documentMode < 10)
      ) {
        const right = this.createRight();

        // Poor man's change layer order
        if (index > 0) {
          const img2 = this.createImg2();
          right.appendChild(img2);

          mxEvent.addListener(img2, "click", (evt) => {
            if (graph.isEnabled()) {
              graph.addCell(child, graph.model.root, index - 1);
            }

            mxEvent.consume(evt);
          });
        }

        if (index >= 0 && index < layerCount - 1) {
          const img1 = this.createImg1();
          right.appendChild(img1);

          mxEvent.addListener(img1, "click", (evt) => {
            if (graph.isEnabled()) {
              graph.addCell(child, graph.model.root, index + 1);
            }

            mxEvent.consume(evt);
          });
        }

        ldiv.appendChild(right);
      }

      if (mxClient.IS_SVG && (!mxClient.IS_IE || documentMode >= 10)) {
        ldiv.setAttribute("draggable", "true");
        ldiv.style.cursor = "move";
      }
    }
  }

  createRight() {
    var right = document.createElement("div");
    right.style.display = "block";
    right.style.textAlign = "right";
    right.style.whiteSpace = "nowrap";
    right.style.position = "absolute";
    right.style.right = "6px";
    right.style.top = "6px";
    this.right = right;
    return right;
  }

  createImg1() {
    var img1 = document.createElement("a");

    img1.setAttribute("title", mxResources.get("toFront"));

    img1.className = "geButton";
    img1.style.cssFloat = "none";
    img1.innerHTML = "&#9650;";
    img1.style.width = "14px";
    img1.style.height = "14px";
    img1.style.fontSize = "14px";
    img1.style.margin = "0px";
    img1.style.marginTop = "-1px";
    this.img1 = img1;
    return img1;
  }

  createImg2() {
    var img2 = document.createElement("a");

    img2.setAttribute("title", mxResources.get("toBack"));

    img2.className = "geButton";
    img2.style.cssFloat = "none";
    img2.innerHTML = "&#9660;";
    img2.style.width = "14px";
    img2.style.height = "14px";
    img2.style.fontSize = "14px";
    img2.style.margin = "0px";
    img2.style.marginTop = "-1px";
    this.img2 = img2;
    return img2;
  }

  createLayerDiv(label) {
    const { backdropColor } = this;
    var ldiv = document.createElement("div");
    ldiv.className = "geToolbarContainer";

    ldiv.style.overflow = "hidden";
    ldiv.style.position = "relative";
    ldiv.style.padding = "4px";
    ldiv.style.height = "22px";
    ldiv.style.display = "block";
    ldiv.style.backgroundColor =
      backdropColor == "white" ? "whiteSmoke" : backdropColor;
    ldiv.style.borderWidth = "0px 0px 1px 0px";
    ldiv.style.borderColor = "#c3c3c3";
    ldiv.style.borderStyle = "solid";
    ldiv.style.whiteSpace = "nowrap";
    ldiv.setAttribute("title", label);
    this.ldiv = ldiv;
  }

  createLeft() {
    var left = document.createElement("div");
    left.style.display = "inline-block";
    left.style.width = "100%";
    left.style.textOverflow = "ellipsis";
    left.style.overflow = "hidden";
    this.left = left;
  }

  addLayerDivDragHandlers(ldiv, { index, child }) {
    const { graph } = this;
    mxEvent.addListener(ldiv, "dragover", (evt) => {
      evt.dataTransfer.dropEffect = "move";
      this.dropIndex = index;
      evt.stopPropagation();
      evt.preventDefault();
    });

    mxEvent.addListener(ldiv, "dragstart", (evt) => {
      this.dragSource = ldiv;

      // Workaround for no DnD on DIV in FF
      if (mxClient.IS_FF) {
        // LATER: Check what triggers a parse as XML on this in FF after drop
        evt.dataTransfer.setData("Text", "<layer/>");
      }
    });

    mxEvent.addListener(ldiv, "dragend", (evt) => {
      const { dragSource, dropIndex } = this;
      if (dragSource != null && dropIndex != null) {
        graph.addCell(child, graph.model.root, dropIndex);
      }

      this.dragSource = null;
      this.dropIndex = null;
      evt.stopPropagation();
      evt.preventDefault();
    });
  }

  createBtn(child) {
    const { graph, lockedImage, unlockedImage } = this;
    var btn = document.createElement("img");
    btn.setAttribute("draggable", "false");
    btn.setAttribute("align", "top");
    btn.setAttribute("border", "0");
    btn.style.padding = "4px";
    btn.setAttribute("title", mxResources.get("lockUnlock"));

    var style = graph.getCurrentCellStyle(child);

    if (mxUtils.getValue(style, "locked", "0") == "1") {
      btn.setAttribute("src", lockedImage);
    } else {
      btn.setAttribute("src", unlockedImage);
    }

    if (graph.isEnabled()) {
      btn.style.cursor = "pointer";
    }

    mxEvent.addListener(btn, "click", (evt) => {
      if (graph.isEnabled()) {
        var value: any;

        graph.getModel().beginUpdate();
        try {
          value = mxUtils.getValue(style, "locked", "0") == "1" ? null : "1";
          graph.setCellStyles("locked", value, [child]);
        } finally {
          graph.getModel().endUpdate();
        }

        if (value == "1") {
          graph.removeSelectionCells(graph.getModel().getDescendants(child));
        }

        mxEvent.consume(evt);
      }
    });
    this.btn = btn;
  }

  createInput(child) {
    var inp = document.createElement("input");
    inp.setAttribute("type", "checkbox");
    inp.setAttribute(
      "title",
      mxResources.get("hideIt", [child.value || mxResources.get("background")])
    );
    inp.style.marginLeft = "4px";
    inp.style.marginRight = "6px";
    inp.style.marginTop = "4px";
    this.inp = inp;
  }
}
