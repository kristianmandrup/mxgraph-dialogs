import { LayerRemover, LayersWindow } from "../../../../dialogs";

import { editorUi } from "../../../mocks";

describe("LayerRemover", () => {
  const ui = editorUi;

  let win, instance;
  beforeAll(() => {
    win = new LayersWindow(ui);
    instance = new LayerRemover(win);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("layersWindow", () => {
        test("is set", () => {
          expect(instance.layersWindow).toBe(win);
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
