import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";
import { InputControls } from "./InputControls";
import { GraphSize } from "./GraphSize";
const {
  mxXmlRequest,
  mxXmlCanvas2D,
  mxClient,
  mxUtils,
  mxResources,
  mxImageExport,
} = mx;
const { MAX_REQUEST_SIZE, SAVE_URL, MAX_AREA, EXPORT_URL } = resources;
/**
 * Constructs a new export dialog.
 */
export class ExportDialog {
  container: any;
  editorUi: any;

  value: any;
  style: any;
  lastBorderValue: any; // ExportDialog.lastBorderValue

  inputs: InputControls;

  get graph() {
    return this.editorUi.editor.graph;
  }

  get ui() {
    return this.editorUi;
  }

  graphSize: GraphSize;

  get size() {
    return this.graphSize.size;
  }

  table: any;
  tbody: any;

  createTable() {
    var table = document.createElement("table");
    table.setAttribute("cellpadding", mxClient.IS_SF ? "0" : "2");
    this.table = table;
    return table;
  }

  createTablebody() {
    const tbody = document.createElement("tbody");
    this.tbody = tbody;
    return tbody;
  }

  constructor(editorUi) {
    this.editorUi = editorUi;
    const { graph } = this;
    this.inputs = new InputControls();
    this.graphSize = new GraphSize(graph);

    const table = this.createTable();
    var tbody = document.createElement("tbody");

    // this.appendNameControl();
    // this.appendFormatControl();
    // this.appendZoomControl();
    // this.appendWidthControl();
    // this.appendHeightControl();
    // this.appendDpiControl();
    // this.appendBorderControl();

    table.appendChild(tbody);

    // mxEvent.addListener(imageFormatSelect, "change", formatChanged);
    // formatChanged();

    // tbody.appendChild(row);
    // table.appendChild(tbody);
    this.container = table;
  }

  /**
   * Remembers last value for border.
   */
  static lastBorderValue = 0;

  /**
   * Global switches for the export dialog.
   */
  static showGifOption = true;

  /**
   * Global switches for the export dialog.
   */
  static showXmlOption = true;

  /**
   * Hook for getting the export format. Returns null for the default
   * intermediate XML export format or a function that returns the
   * parameter and value to be used in the request in the form
   * key=value, where value should be URL encoded.
   */
  static exportFile(editorUi, name, format, bg, s, b, dpi) {
    var graph = editorUi.editor.graph;

    if (format == "xml") {
      ExportDialog.saveLocalFile(
        editorUi,
        mxUtils.getXml(editorUi.editor.getGraphXml()),
        name,
        format
      );
    } else if (format == "svg") {
      ExportDialog.saveLocalFile(
        editorUi,
        mxUtils.getXml(graph.getSvg(bg, s, b)),
        name,
        format
      );
    } else {
      var bounds = graph.getGraphBounds();

      // New image export
      var xmlDoc = mxUtils.createXmlDocument();
      var root = xmlDoc.createElement("output");
      xmlDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var xmlCanvas = new mxXmlCanvas2D(root);
      xmlCanvas.translate(
        Math.floor((b / s - bounds.x) / graph.view.scale),
        Math.floor((b / s - bounds.y) / graph.view.scale)
      );
      xmlCanvas.scale(s / graph.view.scale);

      var imgExport = new mxImageExport();
      imgExport.drawState(
        graph.getView().getState(graph.model.root),
        xmlCanvas
      );

      // Puts request data together
      var param = "xml=" + encodeURIComponent(mxUtils.getXml(root));
      var w = Math.ceil((bounds.width * s) / graph.view.scale + 2 * b);
      var h = Math.ceil((bounds.height * s) / graph.view.scale + 2 * b);

      // Requests image if request is valid
      if (param.length <= MAX_REQUEST_SIZE && w * h < MAX_AREA) {
        editorUi.hideDialog();
        const paramStr =
          "format=" +
          format +
          "&filename=" +
          encodeURIComponent(name) +
          "&bg=" +
          (bg != null ? bg : "none") +
          "&w=" +
          w +
          "&h=" +
          h +
          "&" +
          param +
          "&dpi=" +
          dpi;
        var req = new mxXmlRequest(
          EXPORT_URL,
          paramStr,
          null,
          null,
          null,
          null
        );
        req.simulate(document, "_blank");
      } else {
        mxUtils.alert(mxResources.get("drawingTooLarge"));
      }
    }
  }
  /**
   * Hook for getting the export format. Returns null for the default
   * intermediate XML export format or a function that returns the
   * parameter and value to be used in the request in the form
   * key=value, where value should be URL encoded.
   */
  static saveLocalFile(editorUi, data, filename, format) {
    if (data.length < MAX_REQUEST_SIZE) {
      editorUi.hideDialog();
      const paramStr =
        "xml=" +
        encodeURIComponent(data) +
        "&filename=" +
        encodeURIComponent(filename) +
        "&format=" +
        format;

      var req = new mxXmlRequest(SAVE_URL, paramStr, null, null, null, null);
      req.simulate(document, "_blank");
    } else {
      var xml = mxUtils.getXml(editorUi.editor.getGraphXml());
      mxUtils.alert(mxResources.get("drawingTooLarge"));
      mxUtils.popup(xml);
    }
  }
}
