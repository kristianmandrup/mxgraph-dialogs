import { ColorDialog } from "../../../dialogs";

import { editorUi } from "../../mocks";

describe("ColorDialog", () => {
  const ui = editorUi;

  let dialog;
  beforeAll(() => {
    dialog = new ColorDialog(ui);
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new ColorDialog(ui);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });

    describe("container", () => {
      test("defined", () => {
        dialog = new ColorDialog(ui);
        expect(dialog.container).toBeDefined();
      });
    });

    test("createRecentColorTable", () => {
      const table = dialog.createRecentColorTable();
      expect(table).toBeDefined();
    });

    describe("addPresets", () => {
      test("only presets", () => {
        const presets = {};
        const table = dialog.addPresets(presets);
        expect(table).toBeDefined();
      });
    });

    test("createApplyFunction", () => {
      const fn = dialog.createApplyFunction();
      const color = "blue";

      expect(() => fn(color)).not.toThrow();
    });
  });

  describe("static methods", () => {
    describe("addRecentColor", () => {
      test("blue, 2", () => {
        const color = "blue";
        const max = 2;
        ColorDialog.addRecentColor(color, max);
        expect(ColorDialog.recentColors[0]).toBe(color);
      });
    });
  });
});
