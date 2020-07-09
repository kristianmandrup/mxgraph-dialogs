import mx from "@mxgraph-app/mx";
import { EditDiagramDialog } from "./EditDiagramDialog";
const { mxUtils, mxResources } = mx;

/**
 * - Replace
 * - New
 * - Import
 */
export class ActionSelector {
  dialog: EditDiagramDialog;

  constructor(dialog: EditDiagramDialog) {
    this.dialog = dialog;
  }

  get graph(): any {
    return this.dialog.graph;
  }

  get ui(): any {
    return this.dialog.ui;
  }

  get showNewWindowOption() {
    return EditDiagramDialog.showNewWindowOption;
  }

  createReplaceOption() {
    var replaceOption = document.createElement("option");
    replaceOption.setAttribute("value", "replace");
    mxUtils.write(replaceOption, mxResources.get("replaceExistingDrawing"));
    return replaceOption;
  }

  createNewOption() {
    var newOption = document.createElement("option");
    newOption.setAttribute("value", "new");
    mxUtils.write(newOption, mxResources.get("openInNewWindow"));
    return newOption;
  }

  createImportOption() {
    var option = document.createElement("option");
    option.setAttribute("value", "import");
    mxUtils.write(option, mxResources.get("addToExistingDrawing"));
    return option;
  }

  get isEnabled() {
    return this.ui.editor.graph.isEnabled();
  }

  select: any;

  createSelect() {
    var select = document.createElement("select");
    select.style.width = "180px";
    select.className = "geBtn";
    this.select = select;
    return select;
  }

  createSelector() {
    const {
      isEnabled,
      createReplaceOption,
      createNewOption,
      createImportOption,
    } = this;
    const select = this.createSelect();
    if (isEnabled) {
      const replaceOption = createReplaceOption();
      select.appendChild(replaceOption);
    }

    const { showNewWindowOption } = this;
    const newOption = createNewOption();
    if (showNewWindowOption) {
      select.appendChild(newOption);
    }

    if (isEnabled()) {
      const importOption = createImportOption();
      select.appendChild(importOption);
    }
    return select;
  }
}
