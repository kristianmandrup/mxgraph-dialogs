import { AddLayerManager, LayersWindow } from "../../../../../dialogs";

import { editorUi } from "../../../../mocks";

describe("LayerAdder", () => {
  const ui = editorUi;

  let win, adder;
  beforeAll(() => {
    win = new LayersWindow(ui);
    adder = new AddLayerManager(win);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("layersWindow", () => {
        test("is set", () => {
          expect(adder.layersWindow).toBe(win);
        });
      });

      describe("graph", () => {
        test("defined", () => {
          expect(adder.graph).toBeDefined();
        });
      });

      describe("documentMode", () => {
        test("defined", () => {
          expect(adder.documentMode).toBeDefined();
        });
      });

      describe("layerCount", () => {
        test("defined", () => {
          expect(adder.layerCount).toBeDefined();
        });
      });

      describe("documentMode", () => {
        test("defined", () => {
          expect(adder.listDiv).toBeDefined();
        });
      });

      describe("lockedImage", () => {
        test("defined", () => {
          expect(adder.lockedImage).toBeDefined();
        });
      });

      describe("unlockedImage", () => {
        test("defined", () => {
          expect(adder.unlockedImage).toBeDefined();
        });
      });

      describe("setters", () => {
        const layer = {};

        describe("selectionLayer", () => {
          const layer = {};
          test("sets", () => {
            expect(() => adder.selectionLayer(layer)).not.toThrow();
          });
        });

        describe("dropIndex", () => {
          const index = 0;
          test("sets", () => {
            expect(() => adder.dropIndex(index)).not.toThrow();
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
            expect(() => adder.addLayer(index, label, child, defaultParent)).not
              .toThrow();
          });
        });

        describe("refresh", () => {
          test("does not throw", () => {
            expect(() => adder.refresh()).not
              .toThrow();
          });
        });

        describe("renameLayer", () => {
          const child = {};
          test("does not throw", () => {
            expect(() => adder.renameLayer(child)).not
              .toThrow();
          });
        });

        describe("connectLayerToGraph", () => {
          const child = {}, index = 0;
          test("does not throw", () => {
            expect(() => adder.connectLayerToGraph({ child, index })).not
              .toThrow();
          });
        });

        describe("createRight", () => {
          test("does not throw", () => {
            expect(() => adder.createRight()).not
              .toThrow();
          });
        });

        describe("createImg1", () => {
          test("does not throw", () => {
            expect(() => adder.createImg1()).not
              .toThrow();
          });
        });

        describe("createImg2", () => {
          test("does not throw", () => {
            expect(() => adder.createImg2()).not
              .toThrow();
          });
        });

        describe("createLayerDiv", () => {
          const label = "x";
          test("does not throw", () => {
            expect(() => adder.createLayerDiv(label)).not
              .toThrow();
          });
        });

        describe("createLeft", () => {
          test("does not throw", () => {
            expect(() => adder.createLeft()).not
              .toThrow();
          });
        });

        describe("createBtn", () => {
          const child = {};
          test("does not throw", () => {
            expect(() => adder.createBtn(child)).not
              .toThrow();
          });
        });

        describe("createInput", () => {
          const child = {};
          test("does not throw", () => {
            expect(() => adder.createInput(child)).not
              .toThrow();
          });
        });

        describe("addLayerDivDragHandlers", () => {
          const ldiv = document.createElement("div");
          const index = 0, child = {};
          test("does not throw", () => {
            expect(() => adder.addLayerDivDragHandlers(ldiv, { index, child }))
              .not
              .toThrow();
          });
        });
      });
    });
  });
});
