import { OutlineWindow } from "../../../../dialogs";

import { editorUi } from "../../../mocks";

describe("AboutDialog", () => {
  const ui = editorUi;

  let win;
  beforeAll(() => {
    // const dimensions = { x: 0, y: 0, w: 600, h: 400 };
    win = new OutlineWindow(ui);
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

      describe("outline", () => {
        test("to be defined", () => {
          expect(win.outline).toBeDefined();
        });
      });

      describe("graph", () => {
        test("to be defined", () => {
          expect(win.graph).toBeDefined();
        });
      });

      describe("editorUi", () => {
        test("to be set", () => {
          expect(win.editorUi).toBe(editorUi);
        });
      });
    });

    describe("methods", () => {
      // TODO
    });
  });
});
