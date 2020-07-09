import { OpenDialog } from "../../../dialogs";

import { editorUi, cell } from "../../mocks";

describe("OpenDialog", () => {
  const opts = {
    documentMode: "x",
  };

  let dialog;
  beforeAll(() => {
    dialog = new OpenDialog(opts);
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new OpenDialog(opts);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });
  });
});
