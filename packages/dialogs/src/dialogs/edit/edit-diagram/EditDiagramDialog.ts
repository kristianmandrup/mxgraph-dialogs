export const Graph: any = {};
import { FileDrop } from "./FileDrop";
import { ActionSelector } from "./ActionSelector";
import { TextArea } from "./TextArea";

/**
 * Constructs a new edit file dialog.
 */
export class EditDiagramDialog {
  container: any;
  init: () => void;

  textarea: any;

  createTextArea() {
    return new TextArea(this).createTextArea();
  }

  editorUi: any;

  get graph() {
    return this.editorUi.editor.graph;
  }

  get ui() {
    return this.editorUi;
  }

  fileDrop: FileDrop;

  constructor(editorUi) {
    this.editorUi = editorUi;
    var div = document.createElement("div");
    div.style.textAlign = "right";
    const textarea = this.createTextArea();
    div.appendChild(textarea);

    this.init = () => {
      textarea.focus();
    };

    this.fileDrop = new FileDrop(this);

    const select = this.appendActionSelector();
    div.appendChild(select);

    this.container = div;
  }

  appendActionSelector() {
    const actionSelector = this.createActionSelector();
    return actionSelector.createSelector();
  }

  createActionSelector() {
    return new ActionSelector(this);
  }

  /**
   *
   */
  static showNewWindowOption = true;
}
