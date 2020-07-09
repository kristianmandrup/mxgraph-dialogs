import { LayersWindow } from "./LayersWindow";
import mx from "@mxgraph-app/mx";
const { mxClient } = mx;

export class BaseLayerOperator {
  layersWindow: LayersWindow;
  _baseLink: any;

  constructor(layersWindow: LayersWindow) {
    this.layersWindow = layersWindow;
    this.createBaseLink();
    this.createLink();
    this.addClickHandler();
  }

  get editorUi() {
    return this.layersWindow.editorUi;
  }

  get graph() {
    return this.layersWindow.graph;
  }

  get baseLink() {
    return this._baseLink.clone();
  }

  createBaseLink() {
    var link = document.createElement("a");
    link.className = "geButton";

    if (mxClient.IS_QUIRKS) {
      link.style.filter = "none";
    }
    this._baseLink = link;
  }

  createLink() {
    const { baseLink } = this;
    return baseLink.cloneNode();
  }

  addClickHandler() {}
}
