import { LayersWindow } from "./LayersWindow";
import mx from "@mxgraph-app/mx";
const { mxClient } = mx;

export class LayersWindowUI {
  mainDiv: any;
  ldiv: any;
  listDiv: any;

  layersWindow: LayersWindow;

  constructor(layersWindow: LayersWindow) {
    this.layersWindow = layersWindow;
    this.createDivs();
    this.buildDiv();
  }

  get compactUi() {
    return this.layersWindow.compactUi;
  }

  get backdropColor() {
    return this.layersWindow.backdropColor;
  }

  get tbarHeight() {
    return !this.compactUi ? "30px" : "26px";
  }

  get editorUi() {
    return this.layersWindow.editorUi;
  }

  get links() {
    return this.layersWindow.links;
  }

  createDivs() {
    this.createMainDiv();
    this.createListDiv();
    this.createLayerDiv();
  }

  buildLayerDiv() {
    const { ldiv, links } = this;
    Object.values(links).map((link) => {
      ldiv.appendChild(link);
    });
  }

  buildDiv() {
    this.buildLayerDiv();
    this.mainDiv.appendChild(this.ldiv);
  }

  createMainDiv() {
    const { backdropColor } = this;
    var mainDiv = document.createElement("div");
    mainDiv.style.userSelect = "none";
    mainDiv.style.background =
      backdropColor == "white" ? "whiteSmoke" : backdropColor;
    mainDiv.style.border = "1px solid whiteSmoke";
    mainDiv.style.height = "100%";
    mainDiv.style.marginBottom = "10px";
    mainDiv.style.overflow = "auto";
    this.mainDiv = mainDiv;
    return mainDiv;
  }

  createLayerDiv() {
    const { tbarHeight, compactUi, backdropColor } = this;
    var ldiv = document.createElement("div");

    ldiv.className = "geToolbarContainer";
    ldiv.style.position = "absolute";
    ldiv.style.bottom = "0px";
    ldiv.style.left = "0px";
    ldiv.style.right = "0px";
    ldiv.style.height = tbarHeight;
    ldiv.style.overflow = "hidden";
    ldiv.style.padding = !compactUi ? "1px" : "4px 0px 3px 0px";
    ldiv.style.backgroundColor =
      backdropColor == "white" ? "whiteSmoke" : backdropColor;
    ldiv.style.borderWidth = "1px 0px 0px 0px";
    ldiv.style.borderColor = "#c3c3c3";
    ldiv.style.borderStyle = "solid";
    ldiv.style.display = "block";
    ldiv.style.whiteSpace = "nowrap";

    if (mxClient.IS_QUIRKS) {
      ldiv.style.filter = "none";
    }
    this.ldiv = ldiv;
    return ldiv;
  }

  createListDiv() {
    const { mainDiv, tbarHeight, backdropColor } = this;

    var listDiv = document.createElement("div");
    listDiv.style.backgroundColor =
      backdropColor == "white" ? "#dcdcdc" : backdropColor;
    listDiv.style.position = "absolute";
    listDiv.style.overflow = "auto";
    listDiv.style.left = "0px";
    listDiv.style.right = "0px";
    listDiv.style.top = "0px";
    listDiv.style.bottom = parseInt(tbarHeight) + 7 + "px";
    this.listDiv = listDiv;
    mainDiv.appendChild(listDiv);
  }
}
