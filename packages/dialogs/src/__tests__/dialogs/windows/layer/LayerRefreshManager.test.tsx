import { LayerRefreshManager, LayersWindow } from "../../../../dialogs";

import { editorUi } from "../../../mocks";

describe("LayerRefreshManager", () => {
  const ui = editorUi;

  let win, instance;
  beforeAll(() => {
    win = new LayersWindow(ui);
    instance = new LayerRefreshManager(win);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("layersWindow", () => {
        test("is set", () => {
          expect(instance.layersWindow).toBe(win);
        });
      });

      describe("links", () => {
        test("defined", () => {
          expect(instance.links).toBeDefined();
        });

        test("has insert entry", () => {
          expect(instance.links.insert).toBeDefined();
        });
      });

      describe("backdropColor", () => {
        test("defined", () => {
          expect(instance.backdropColor).toBeDefined();
        });
      });

      describe("listDiv", () => {
        test("defined", () => {
          expect(instance.listDiv).toBeDefined();
        });
      });

      describe("selectionLayer", () => {
        const layer = {};
        test("is set", () => {
          expect(() => instance.selectionLayer).not.toThrow();
        });
      });

      describe("setters", () => {
        describe("dropIndex", () => {
          const index = 0;
          test("sets", () => {
            expect(() => instance.dropIndex(index)).not.toThrow();
          });
        });
      });
    });

    describe("methods", () => {
      describe("addLayer", () => {
        const index = 0,
          label = "x",
          child = document.createElement("a"),
          defaultParent = {};

        test("does not throw", () => {
          expect(() => instance.addLayer(index, label, child, defaultParent))
            .not
            .toThrow();
        });
      });

      describe("refresh", () => {
        test("does not throw", () => {
          expect(() => instance.refresh()).not
            .toThrow();
        });
      });
    });
  });
});
