import { ExportDialog } from "../../../dialogs";

import { editorUi, cell } from "../../mocks";

describe("ExportDialog", () => {
  const ui = editorUi;
  const cell = {};

  let dialog;
  beforeAll(() => {
    dialog = new ExportDialog(ui);
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new ExportDialog(ui);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });
  });
});
