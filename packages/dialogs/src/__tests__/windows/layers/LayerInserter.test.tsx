import { LayerInserter, LayersWindow } from "../../../windows";

import { editorUi } from "../../mocks";

describe("LayerInserter", () => {
  const ui = editorUi;

  let win, instance;
  beforeAll(() => {
    win = new LayersWindow(ui);
    instance = new LayerInserter(win);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("layersWindow", () => {
        test("is set", () => {
          expect(instance.layersWindow).toBe(win);
        });
      });

      describe("selectionLayer", () => {
        test("is set", () => {
          expect(instance.selectionLayer).toBeDefined();
        });
      });

      describe("layerCount", () => {
        test("is set", () => {
          expect(instance.layerCount).toBeDefined();
        });
      });

      describe("checkmarkImage", () => {
        test("is set", () => {
          expect(instance.checkmarkImage).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("addClickHandler", () => {
        test("does not throw", () => {
          expect(() => instance.addClickHandler()).not.toThrow();
        });
      });

      describe("createLink", () => {
        test("does not throw", () => {
          expect(() => instance.createLink()).not.toThrow();
        });
      });
    });
  });
});
