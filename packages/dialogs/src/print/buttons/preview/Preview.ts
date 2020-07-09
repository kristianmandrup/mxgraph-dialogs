import mx from "@mxgraph-app/mx";
const {
  mxRectangle,
  mxPrintPreview,
  mxUtils,
  mxResources,
  mxConstants,
  mxClient,
} = mx;

export class Preview {
  dialog: any;
  inputs: any;

  constructor(dialog: any) {
    this.dialog = dialog;
    this.inputs = dialog.inputs;
  }

  get graph() {
    return this.dialog.graph;
  }

  // Overall scale for print-out to account for print borders in dialogs etc
  preview(print = false) {
    const { graph, inputs } = this;
    const {
      pageCountCheckBox,
      onePageCheckBox,
      pageScaleInput,
      pageCountInput,
    } = inputs;

    var autoOrigin = onePageCheckBox.checked || pageCountCheckBox.checked;
    var printScale = parseInt(pageScaleInput.value) / 100;

    if (isNaN(printScale)) {
      printScale = 1;
      pageScaleInput.value = "100%";
    }

    // Workaround to match available paper size in actual print output
    printScale *= 0.75;

    var pf = graph.pageFormat || mxConstants.PAGE_FORMAT_A4_PORTRAIT;
    var scale = 1 / graph.pageScale;

    if (autoOrigin) {
      var pageCount = onePageCheckBox.checked
        ? 1
        : parseInt(pageCountInput.value);

      if (!isNaN(pageCount)) {
        scale = mxUtils.getScaleForPageCount(pageCount, graph, pf, undefined);
      }
    }

    // Negative coordinates are cropped or shifted if page visible
    // var gb = graph.getGraphBounds();
    var border = 0;
    var x0 = 0;
    var y0 = 0;

    // Applies print scale
    pf = mxRectangle.fromRectangle(pf);
    pf.width = Math.ceil(pf.width * printScale);
    pf.height = Math.ceil(pf.height * printScale);
    scale *= printScale;

    // Starts at first visible page
    if (!autoOrigin && graph.pageVisible) {
      var layout = graph.getPageLayout();
      x0 -= layout.x * pf.width;
      y0 -= layout.y * pf.height;
    } else {
      autoOrigin = true;
    }

    var preview = this.createPrintPreview(
      graph,
      scale,
      pf,
      border,
      x0,
      y0,
      autoOrigin
    );
    preview.open();

    if (print) {
      this.printPreview(preview);
    }
  }

  /**
   * Constructs a new print dialog.
   */
  printPreview(preview) {
    try {
      if (preview.wnd != null) {
        var printFn = function () {
          preview.wnd.focus();
          preview.wnd.print();
          preview.wnd.close();
        };

        // Workaround for Google Chrome which needs a bit of a
        // delay in order to render the SVG contents
        // Needs testing in production
        if (mxClient.IS_GC) {
          window.setTimeout(printFn, 500);
        } else {
          printFn();
        }
      }
    } catch (e) {
      // ignores possible Access Denied
    }
  }

  /**
   * Constructs a new print dialog.
   */
  createPrintPreview(graph, scale, pf, border, x0, y0, autoOrigin) {
    var preview: any = new mxPrintPreview(graph, scale, pf, border, x0, y0);
    preview.title = mxResources.get("preview");
    preview.printBackgroundImage = true;
    preview.autoOrigin = autoOrigin;
    var bg = graph.background;

    if (bg == null || bg == "" || bg == mxConstants.NONE) {
      bg = "#ffffff";
    }

    preview.backgroundColor = bg;

    var writeHead = preview.writeHead;

    // Adds a border in the preview
    preview.writeHead = function (doc) {
      writeHead.apply(this, arguments);

      doc.writeln('<style type="text/css">');
      doc.writeln("@media screen {");
      doc.writeln("  body > div { padding:30px;box-sizing:content-box; }");
      doc.writeln("}");
      doc.writeln("</style>");
    };

    return preview;
  }
}
