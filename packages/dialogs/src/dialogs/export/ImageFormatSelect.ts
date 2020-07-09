import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class ImageFormatSelect {
  static showGifOption = true;
  static showXmlOption = true;

  get showGifOption() {
    return ImageFormatSelect.showGifOption;
  }

  get showXmlOption() {
    return ImageFormatSelect.showXmlOption;
  }

  pngOption: any;
  gifOption: any;
  imageFormatSelect: any;

  createPngOption() {
    var pngOption = document.createElement("option");
    pngOption.setAttribute("value", "png");
    mxUtils.write(pngOption, mxResources.get("formatPng"));
    this.pngOption = pngOption;
    return pngOption;
  }

  addPngOption() {
    const { imageFormatSelect } = this;
    const pngOption = this.createPngOption();
    imageFormatSelect.appendChild(pngOption);
    return imageFormatSelect;
  }

  createImageFormatSelect() {
    var imageFormatSelect = document.createElement("select");
    imageFormatSelect.style.width = "180px";
    this.imageFormatSelect = imageFormatSelect;
    return imageFormatSelect;
  }

  createGifOption() {
    var gifOption = document.createElement("option");
    gifOption.setAttribute("value", "gif");
    mxUtils.write(gifOption, mxResources.get("formatGif"));
    this.gifOption = gifOption;
    return gifOption;
  }

  addGifOption() {
    const { showGifOption, imageFormatSelect } = this;
    if (showGifOption) {
      const gifOption = this.createGifOption();
      imageFormatSelect.appendChild(gifOption);
    }
  }

  addJpgOption() {
    const { imageFormatSelect } = this;
    var jpgOption = document.createElement("option");
    jpgOption.setAttribute("value", "jpg");
    mxUtils.write(jpgOption, mxResources.get("formatJpg"));
    imageFormatSelect.appendChild(jpgOption);
    return imageFormatSelect;
  }

  addPdfOption() {
    const { imageFormatSelect } = this;
    var pdfOption = document.createElement("option");
    pdfOption.setAttribute("value", "pdf");
    mxUtils.write(pdfOption, mxResources.get("formatPdf"));
    imageFormatSelect.appendChild(pdfOption);
    return imageFormatSelect;
  }

  addSvgOption() {
    const { imageFormatSelect } = this;
    var svgOption = document.createElement("option");
    svgOption.setAttribute("value", "svg");
    mxUtils.write(svgOption, mxResources.get("formatSvg"));
    imageFormatSelect.appendChild(svgOption);
    return imageFormatSelect;
  }

  addXmlOption() {
    const { imageFormatSelect, showXmlOption } = this;
    if (showXmlOption) {
      var xmlOption = document.createElement("option");
      xmlOption.setAttribute("value", "xml");
      mxUtils.write(xmlOption, mxResources.get("formatXml"));
      imageFormatSelect.appendChild(xmlOption);
    }
    return imageFormatSelect;
  }

  createSelect() {
    const imageFormatSelect = this.createImageFormatSelect();
    this.addPngOption();
    this.addJpgOption();
    this.addPdfOption();
    this.addSvgOption();
    this.addXmlOption();
    return imageFormatSelect;
  }
}
