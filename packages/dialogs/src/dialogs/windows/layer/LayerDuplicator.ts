import { BaseLayerOperator } from "./BaseLayerOperator";
import mx from "@mxgraph-app/mx";
const { mxResources, mxEvent } = mx;

export class LayerDuplicator extends BaseLayerOperator {
  link: any;

  get selectionLayer() {
    return this.layersWindow.selectionLayer;
  }

  createLink() {
    const { baseLink, graph } = this;

    var link: any = baseLink;
    link.innerHTML =
      '<div class="geSprite geSprite-duplicate" style="display:inline-block;"></div>';

    if (!graph.isEnabled()) {
      link.className = "geButton mxDisabled";
    }
    this.link = link;
    return link;
  }

  addClickHandler() {
    const { link, graph, selectionLayer } = this;
    mxEvent.addListener(link, "click", (_evt) => {
      if (graph.isEnabled()) {
        var newCell: any;
        graph.model.beginUpdate();
        try {
          newCell = graph.cloneCell(selectionLayer);
          graph.cellLabelChanged(newCell, mxResources.get("untitledLayer"));
          newCell.setVisible(true);
          newCell = graph.addCell(newCell, graph.model.root);
          graph.setDefaultParent(newCell);
        } finally {
          graph.model.endUpdate();
        }

        if (newCell != null && !graph.isCellLocked(newCell)) {
          graph.selectAll(newCell);
        }
      }
    });
  }
}
