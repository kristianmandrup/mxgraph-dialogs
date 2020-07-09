import { BaseLayerOperator } from "./BaseLayerOperator";
import mx from "@mxgraph-app/mx";
const { mxResources, mxEvent } = mx;

export class LayerData extends BaseLayerOperator {
  link: any;

  get selectionLayer() {
    return this.layersWindow.selectionLayer;
  }

  createLink() {
    const { baseLink, graph } = this;
    const title = mxResources.get("rename");
    const link: any = baseLink;
    link.innerHTML =
      '<div class="geSprite geSprite-dots" style="display:inline-block;"></div>';
    link.setAttribute("title", title);

    if (!graph.isEnabled()) {
      link.className = "geButton mxDisabled";
    }
    return link;
  }

  addClickHandler() {
    const { link, graph } = this;
    mxEvent.addListener(link, "click", (evt) => {
      if (graph.isEnabled()) {
        this.showDataDialog();
      }

      mxEvent.consume(evt);
    });
  }

  showDataDialog() {
    const { editorUi, selectionLayer } = this;
    editorUi.showDataDialog(selectionLayer);
  }
}
