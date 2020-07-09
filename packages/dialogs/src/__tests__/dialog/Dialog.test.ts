import { Dialog } from "../../";
import { editorUi } from "../mocks";

describe("Dialog", () => {
  const ui = editorUi;
  const element = document.createElement("div");
  const opts = {};

  let dialog;
  beforeAll(() => {
    dialog = new Dialog(ui, element, opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("container", () => {
        test("defined", () => {
          expect(dialog.container).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("getPosition(left, top, w, h)", () => {
        const bounds = [0, 0, 100, 100]; // left, top, w, h
        test("is set", () => {
          expect(dialog.getPosition(...bounds)).toBeDefined();
        });
      });

      describe("initialize(opts)", () => {
        const opts = {};
        test("initializes - no throw", () => {
          expect(() => dialog.initialize(opts)).not.toThrow();
        });
      });

      describe("createDialogInit(opts)", () => {
        const opts = {};
        test("creates DialogInit instance", () => {
          expect(dialog.createDialogInit(opts)).toBeDefined();
        });
      });

      // can be used to customize initialization
      describe("init()", () => {
        test("no throw", () => {
          expect(() => dialog.init()).not.toThrow();
        });
      });

      describe("createDialogResizer()", () => {
        test("creates DialogResizer instance", () => {
          expect(dialog.createDialogResizer()).toBeDefined();
        });
      });

      describe("resizeListener()", () => {
        test("creates and configures resize listener", () => {
          expect(() => dialog.resizeListener()).not.toThrow();
        });
      });
    });
  });
});
