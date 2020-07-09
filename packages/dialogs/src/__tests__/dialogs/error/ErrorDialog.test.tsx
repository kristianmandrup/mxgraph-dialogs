import { ErrorDialog } from "../../..";

import { editorUi } from "../../mocks";

describe("ErrorDialog", () => {
  const ui = editorUi;
  const title = "error";
  const message = "you got an error";
  const buttonTxt = "ok";

  let dialog;
  beforeAll(() => {
    dialog = new ErrorDialog(ui, title, message, buttonTxt);
  });

  describe("container", () => {
    test("defined", () => {
      expect(dialog.container).toBeDefined();
    });
  });
});
