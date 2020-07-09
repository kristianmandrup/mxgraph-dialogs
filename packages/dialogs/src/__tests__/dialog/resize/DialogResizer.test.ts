import { DialogResizer } from "../../../";
import { editorUi } from "../../mocks";
import { Dialog } from "../../../dialog";

describe("DialogResizer", () => {
  const ui = editorUi;
  const element = document.createElement("div");
  const opts = {};
  const dialog = new Dialog(ui, element, opts);

  let instance;
  beforeAll(() => {
    instance = new DialogResizer(dialog);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("container", () => {
        test("defined", () => {
          expect(instance.container).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("resizeListener()", () => {
        test("creates and configures listener - no throw", () => {
          expect(instance.resizeListener()).toBeDefined();
        });
      });
    });
  });
});
