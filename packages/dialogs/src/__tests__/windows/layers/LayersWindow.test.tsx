import { LayersWindow } from "../../../../dialogs";

import { editorUi } from "../../../mocks";

describe("LayersWindow", () => {
  const ui = editorUi;

  let win;
  beforeAll(() => {
    win = new LayersWindow(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("window", () => {
        test("defined", () => {
          expect(win.window).toBeDefined();
        });
      });

      // container div element
      describe("div", () => {
        test("defined", () => {
          expect(win.div).toBeDefined();
        });
      });

      describe("documentMode", () => {
        test("to be set", () => {
          expect(win.documentMode).toBeDefined();
        });
      });

      describe("graph", () => {
        test("to be defined", () => {
          expect(win.graph).toBeDefined();
        });
      });

      describe("listDiv", () => {
        test("defined", () => {
          expect(win.listDiv).toBeDefined();
        });
      });

      describe("editorUi", () => {
        test("to be set", () => {
          expect(win.editorUi).toBe(editorUi);
        });
      });
    });

    describe("methods", () => {
      describe("#labelOf", () => {
        test("renames layer", () => {
          const label = "x";
          const layer = label;
          expect(win.labelOf(layer)).toEqual(label);
        });
      });

      describe("#renameLayer", () => {
        test("renames layer", () => {
          const layer = "x";
          expect(win.renameLayer(layer)).not.toThrow();
        });
      });

      describe("#createRenameDialog", () => {
        test("returns dialog", () => {
          const layer = {};
          expect(win.createRenameDialog(layer, "x")).not.toThrow();
        });
      });

      describe("#resizeListener", () => {
        test("does not throw", () => {
          expect(() => win.resizeListener()).not.toThrow();
        });
      });
      describe("#init", () => {
        test("does not throw", () => {
          expect(() => win.init()).not.toThrow();
        });
      });
      describe("#destroy", () => {
        test("does not throw", () => {
          expect(() => win.init()).not.toThrow();
        });
      });
    });
  });
});
