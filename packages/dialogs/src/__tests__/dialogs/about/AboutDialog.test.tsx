import { AboutDialog } from "../../../dialogs";

import { editorUi } from "../../mocks";

describe("AboutDialog", () => {
  const ui = editorUi;

  let dialog;
  beforeAll(() => {
    dialog = new AboutDialog(ui);
  });

  describe("container", () => {
    test("defined", () => {
      expect(dialog.container).toBeDefined();
    });
  });
});
