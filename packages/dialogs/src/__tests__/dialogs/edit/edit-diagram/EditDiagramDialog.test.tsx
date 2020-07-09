import { EditDiagramDialog } from "../../../../dialogs";

import { editorUi, cell } from "../../../mocks";

describe("EditDiagramDialog", () => {
  const ui = editorUi;
  const cell = {};

  let dialog;
  beforeAll(() => {
    dialog = new EditDiagramDialog(ui);
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new EditDiagramDialog(ui);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });
  });
});
