import mx from "@mxgraph-app/mx";
import { EditDataDialog } from "./EditDataDialog";
import { BaseBtn } from "./BaseBtn";
const { mxUtils, mxResources } = mx;

export class ApplyBtn extends BaseBtn {
  btn: any;

  constructor(dialog: EditDataDialog) {
    super(dialog);
    this.createBtn();
    // this.configure();
  }

  createBtn() {
    var btn = mxUtils.button(mxResources.get("apply"), () => {
      const { ui, names, texts, graph, cell } = this;
      let { value } = this;
      try {
        ui.hideDialog.apply(ui, arguments);

        // Clones and updates the value
        value = value.cloneNode(true);
        var removeLabel = false;

        for (var i = 0; i < names.length; i++) {
          if (texts[i] == null) {
            value.removeAttribute(names[i]);
          } else {
            value.setAttribute(names[i], texts[i].value);
            removeLabel =
              removeLabel ||
              (names[i] == "placeholder" &&
                value.getAttribute("placeholders") == "1");
          }
        }

        // Removes label if placeholder is assigned
        if (removeLabel) {
          value.removeAttribute("label");
        }

        // Updates the value of the cell (undoable)
        graph.getModel().setValue(cell, value);
      } catch (e) {
        mxUtils.alert(e);
      }
    });
    btn.className = "geBtn gePrimaryBtn";
    this.btn = btn;
    return btn;
  }
}
