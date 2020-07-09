import { EditDataDialog } from "../../../../dialogs";

import { editorUi, cell } from "../../../mocks";

describe("EditDataDialog", () => {
  const ui = editorUi;
  const cell = {};

  let dialog;
  beforeAll(() => {
    dialog = new EditDataDialog(ui, cell);
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new EditDataDialog(ui, cell);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });
  });
});
