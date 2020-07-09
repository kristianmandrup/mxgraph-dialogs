import { EditDiagramDialog, Graph } from "./EditDiagramDialog";

export class FileDrop {
  dialog: EditDiagramDialog;

  constructor(dialog: EditDiagramDialog) {
    this.dialog = dialog;
    this.configure();
  }

  get graph(): any {
    return this.dialog.graph;
  }

  get textarea(): any {
    return this.dialog.textarea;
  }

  get ui(): any {
    return this.dialog.ui;
  }

  configure() {
    const { textarea, handleDragOver, handleDrop } = this;
    // Enables dropping files
    if (!Graph.fileSupport) return;

    // Setup the dnd listeners.
    textarea.addEventListener("dragover", handleDragOver, false);
    textarea.addEventListener("drop", handleDrop, false);
  }

  handleDrop = (evt) => {
    const { ui, textarea } = this;
    evt.stopPropagation();
    evt.preventDefault();

    if (evt.dataTransfer.files.length > 0) {
      var file = evt.dataTransfer.files[0];
      var reader = new FileReader();

      reader.onload = (e: any) => {
        textarea.value = e.target.result;
      };

      reader.readAsText(file);
    } else {
      textarea.value = ui.extractGraphModelFromEvent(evt);
    }
  };

  handleDragOver = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  };
}
