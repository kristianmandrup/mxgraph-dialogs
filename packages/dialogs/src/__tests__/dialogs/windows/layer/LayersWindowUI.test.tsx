import { LayersWindowUI, LayersWindow } from "../../../../dialogs";

import { editorUi } from "../../../mocks";

describe("LayersWindowUI", () => {
  const ui = editorUi;

  let win, instance;
  beforeAll(() => {
    win = new LayersWindow(ui);
    instance = new LayersWindowUI(win);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("layersWindow", () => {
        test("is set", () => {
          expect(instance.layersWindow).toBe(win);
        });
      });

      describe("mainDiv", () => {
        test("is set", () => {
          expect(instance.mainDiv).toBeDefined();
        });
      });
      describe("ldiv", () => {
        test("is set", () => {
          expect(instance.ldiv).toBeDefined();
        });
      });
      describe("listDiv", () => {
        test("is set", () => {
          expect(instance.listDiv).toBeDefined();
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

      describe("tbarHeight", () => {
        test("defined", () => {
          expect(instance.tbarHeight).toBeDefined();
        });
      });

      describe("compactUi", () => {
        test("defined", () => {
          expect(instance.compactUi).toBeDefined();
        });
      });

      describe("editorUi", () => {
        test("defined", () => {
          expect(instance.editorUi).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createListDiv", () => {
        test("does not throw", () => {
          expect(() => instance.createListDiv()).not
            .toThrow();
        });
      });

      describe("createDivs", () => {
        test("does not throw", () => {
          expect(() => instance.createDivs()).not
            .toThrow();
        });
      });

      describe("buildLayerDiv", () => {
        test("does not throw", () => {
          expect(() => instance.buildLayerDiv()).not
            .toThrow();
        });
      });

      describe("buildDiv", () => {
        test("does not throw", () => {
          expect(() => instance.buildDiv()).not
            .toThrow();
        });
      });

      describe("createMainDiv", () => {
        test("does not throw", () => {
          expect(() => instance.createMainDiv()).not
            .toThrow();
        });
      });

      describe("createLayerDiv", () => {
        test("does not throw", () => {
          expect(() => instance.createLayerDiv()).not
            .toThrow();
        });
      });
    });
  });
});
