import { BaseLayerOperator } from "./BaseLayerOperator";
import mx from "@mxgraph-app/mx";
const { mxResources, mxEvent, mxCell } = mx;

export class LayerAdder extends BaseLayerOperator {
  link: any;

  get selectionLayer() {
    return this.layersWindow.selectionLayer;
  }

  createLink() {
    const { baseLink, graph } = this;
    const link: any = baseLink;
    link.innerHTML =
      '<div class="geSprite geSprite-plus" style="display:inline-block;"></div>';
    link.setAttribute("title", mxResources.get("addLayer"));

    if (!graph.isEnabled()) {
      link.className = "geButton mxDisabled";
    }

    return link;
  }

  addClickHandler() {
    const { link, graph } = this;
    mxEvent.addListener(link, "click", function (evt) {
      if (graph.isEnabled()) {
        graph.model.beginUpdate();

        try {
          var cell = graph.addCell(
            new mxCell(mxResources.get("untitledLayer")),
            graph.model.root
          );
          graph.setDefaultParent(cell);
        } finally {
          graph.model.endUpdate();
        }
      }

      mxEvent.consume(evt);
    });
  }
}
