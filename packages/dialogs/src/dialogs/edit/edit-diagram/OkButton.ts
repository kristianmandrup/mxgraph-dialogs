import mx from "@mxgraph-app/mx";
import { BaseDialogBtn } from "../../base";
const { mxCodec, mxGraphModel, mxUtils, mxResources } = mx;
const Graph: any = {};

export class OkBtn extends BaseDialogBtn {
  get graph(): any {
    return this.dialog.graph;
  }

  get textarea(): any {
    return this.dialog.textarea;
  }

  get ui(): any {
    return this.dialog.ui;
  }

  get select(): any {
    return this.dialog.select;
  }

  createBtn() {
    const btn = mxUtils.button(mxResources.get("ok"), () => {
      const { textarea, ui, select } = this;
      // Removes all illegal control characters before parsing
      var data = Graph.zapGremlins(mxUtils.trim(textarea.value));
      var error: any;

      if (select.value == "new") {
        ui.hideDialog();
        ui.editor.editAsNew(data);
      } else if (select.value == "replace") {
        ui.editor.graph.model.beginUpdate();
        try {
          ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
          // LATER: Why is hideDialog between begin-/endUpdate faster?
          ui.hideDialog();
        } catch (e) {
          error = e;
        } finally {
          ui.editor.graph.model.endUpdate();
        }
      } else if (select.value == "import") {
        ui.editor.graph.model.beginUpdate();
        try {
          var doc = mxUtils.parseXml(data);
          var model = new mxGraphModel();
          var codec = new mxCodec(doc);
          codec.decode(doc.documentElement, model);

          var children = model.getChildren(
            model.getChildAt(model.getRoot(), 0)
          );
          ui.editor.graph.setSelectionCells(
            ui.editor.graph.importCells(children)
          );

          // LATER: Why is hideDialog between begin-/endUpdate faster?
          ui.hideDialog();
        } catch (e) {
          error = e;
        } finally {
          ui.editor.graph.model.endUpdate();
        }
      }

      if (error != null) {
        mxUtils.alert(error.message);
      }
    });
    btn.className = "geBtn gePrimaryBtn";
    this.btn = btn;
    return btn;
  }
}
