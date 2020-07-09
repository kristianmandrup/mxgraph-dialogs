import { BaseLayerOperator } from "./BaseLayerOperator";
import mx from "@mxgraph-app/mx";
const { mxEvent, mxCell } = mx;

export class LayerRemover extends BaseLayerOperator {
  link: any;

  get selectionLayer() {
    return this.layersWindow.selectionLayer;
  }

  createLink() {
    const { baseLink, graph } = this;
    var link: any = baseLink;
    link.innerHTML =
      '<div class="geSprite geSprite-delete" style="display:inline-block;"></div>';

    if (!graph.isEnabled()) {
      link.className = "geButton mxDisabled";
    }
    this.link = link;
    return link;
  }

  addClickHandler() {
    const { selectionLayer, link, graph } = this;
    mxEvent.addListener(link, "click", function (evt) {
      if (graph.isEnabled()) {
        graph.model.beginUpdate();
        try {
          var index = graph.model.root.getIndex(selectionLayer);
          graph.removeCells([selectionLayer], false);

          // Creates default layer if no layer exists
          if (graph.model.getChildCount(graph.model.root) == 0) {
            graph.model.add(graph.model.root, new mxCell());
            graph.setDefaultParent(null);
          } else if (
            index > 0 &&
            index <= graph.model.getChildCount(graph.model.root)
          ) {
            graph.setDefaultParent(
              graph.model.getChildAt(graph.model.root, index - 1)
            );
          } else {
            graph.setDefaultParent(null);
          }
        } finally {
          graph.model.endUpdate();
        }
      }

      mxEvent.consume(evt);
    });
  }
}
