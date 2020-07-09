import { LayersWindow } from "./LayersWindow";
import mx from "@mxgraph-app/mx";
import { AddLayerManager } from "./add";
const { mxResources } = mx;

export class LayerRefreshManager {
  layersWindow: LayersWindow;
  graph: any;
  layerCount: number = 0;
  dragSource: any;

  constructor(layersWindow: LayersWindow) {
    this.layersWindow = layersWindow;
    this.graph = layersWindow.graph;
  }

  set dropIndex(index) {
    this.layersWindow.dropIndex = index;
  }

  get listDiv() {
    return this.layersWindow.listDiv;
  }

  get backdropColor() {
    return this.layersWindow.backdropColor;
  }

  get selectionLayer() {
    return this.layersWindow.selectionLayer;
  }

  get links() {
    return this.layersWindow.links;
  }

  addLayer = (index, label, child, defaultParent) => {
    new AddLayerManager(this.layersWindow).addLayer(
      index,
      label,
      child,
      defaultParent
    );
  };

  refresh = () => {
    const { graph, listDiv } = this;
    this.layerCount = graph.model.getChildCount(graph.model.root);
    listDiv.innerHTML = "";

    const { selectionLayer, layerCount } = this;

    // Cannot be moved or deleted
    for (var i = layerCount - 1; i >= 0; i--) {
      const add = (child) => {
        this.addLayer(
          i,
          graph.convertValueToString(child) || mxResources.get("background"),
          child,
          child
        );
      };
      add(graph.model.getChildAt(graph.model.root, i));
    }

    const { links } = this;

    var label =
      graph.convertValueToString(selectionLayer) ||
      mxResources.get("background");
    links.remove.setAttribute("title", mxResources.get("removeIt", [label]));
    links.duplicate.setAttribute(
      "title",
      mxResources.get("duplicateIt", [label])
    );
    links.data.setAttribute("title", mxResources.get("editData"));

    if (graph.isSelectionEmpty()) {
      links.insert.className = "geButton mxDisabled";
    }
  };
}
