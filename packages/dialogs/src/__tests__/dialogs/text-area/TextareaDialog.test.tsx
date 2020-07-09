import { TextareaDialog } from "../../../dialogs";

import { editorUi, cell } from "../../mocks";

describe("TextareaDialog", () => {
  const opts = {
    title: "text",
    url: "www.text.com",
    fn: () => {},
    cancelFn: () => {},
    cancelTitle: "cancel",
  };

  let dialog;
  beforeAll(() => {
    dialog = new TextareaDialog(
      editorUi,
      opts,
    );
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new TextareaDialog(editorUi, opts);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });
  });
});
