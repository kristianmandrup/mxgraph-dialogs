import { LayerData, LayersWindow } from "../../../../dialogs";

import { editorUi } from "../../../mocks";

describe("LayerData", () => {
  const ui = editorUi;

  let win, instance;
  beforeAll(() => {
    win = new LayersWindow(ui);
    instance = new LayerData(win);
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
