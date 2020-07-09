import { PrintDialog } from "../../..";

import { editorUi } from "../../mocks";

const open = jest.fn();
Object.defineProperty(window, "open", open);

describe("PrintDialog", () => {
  const ui = editorUi;
  const title = "Print it";

  let dialog;
  beforeAll(() => {
    dialog = new PrintDialog(ui, title);
  });

  describe("created", () => {
    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });
  });

  describe("preview", () => {
    describe("no print arg (false)", () => {
      test("does not throw", () => {
        expect(() => dialog.preview()).not.toThrow();
      });
    });
  });
});
