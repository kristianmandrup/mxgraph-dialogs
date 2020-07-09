import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";

const { mxUtils, mxClient, mxResources } = mx;
const { IMAGE_PATH } = resources;

/**
 * Constructs a new about dialog.
 */
export class AboutDialog {
  editorUi: any;
  container: any;

  img?: HTMLElement;
  mainDiv?: HTMLElement;
  link?: HTMLElement;
  closeBtn?: HTMLElement;
  header?: HTMLElement;

  constructor(editorUi: any) {
    this.editorUi = editorUi;
    this.draw();
  }

  draw() {
    const mainDiv = this.createMainDiv();
    this.buildMainDiv();
    const closeBtn: any = this.createCloseBtn();
    mainDiv.appendChild(closeBtn);
    this.container = mainDiv;
  }

  buildMainDiv() {
    const mainDiv: any = this.mainDiv;
    const header: any = this.createHeader();
    mainDiv.appendChild(header);
    mainDiv.appendChild(this.createImg());
    mxUtils.br(mainDiv);
    mxUtils.write(mainDiv, "Powered by mxGraph " + mxClient.VERSION);
    mxUtils.br(mainDiv);

    const link = this.createLink();
    mainDiv.appendChild(link);
    mxUtils.br(mainDiv);
    mxUtils.br(mainDiv);
  }

  createHeader() {
    var header = document.createElement("h3");
    mxUtils.write(header, mxResources.get("about") + " GraphEditor");
    this.header = header;
    return this.header;
  }

  createMainDiv() {
    var mainDiv = document.createElement("mainDiv");
    mainDiv.setAttribute("align", "center");
    this.mainDiv = mainDiv;
    return this.mainDiv;
  }

  createImg() {
    var img = document.createElement("img");
    img.style.border = "0px";
    img.setAttribute("width", "176");
    img.setAttribute("width", "151");
    img.setAttribute("src", IMAGE_PATH + "/logo.png");
    this.img = img;
    return this.img;
  }

  createLink() {
    var link = document.createElement("a");
    link.setAttribute("href", "http://www.jgraph.com/");
    link.setAttribute("target", "_blank");
    mxUtils.write(link, "www.jgraph.com");
    this.link = link;
    return this.link;
  }

  createCloseBtn() {
    const { editorUi } = this;
    var closeBtn = mxUtils.button(mxResources.get("close"), () => {
      editorUi.hideDialog();
    });
    closeBtn.className = "geBtn gePrimaryBtn";
    this.closeBtn = closeBtn;
    return this.closeBtn;
  }
}
