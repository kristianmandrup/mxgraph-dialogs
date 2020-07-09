import { FilenameDialog } from "../../..";

import { editorUi } from "../../mocks";

describe("FilenameDialog", () => {
  const ui = editorUi;
  const fileName = "you got an error";
  const buttonTxt = "ok";
  const fn = () => {};
  const label = "select file";

  let dialog;
  beforeAll(() => {
    dialog = new FilenameDialog(ui, { fileName, buttonTxt, fn, label });
  });

  describe("container", () => {
    test("defined", () => {
      expect(dialog.container).toBeDefined();
    });
  });
});
