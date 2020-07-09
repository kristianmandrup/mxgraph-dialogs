import { LinkDialog } from "../../../dialogs";

import { editorUi, cell } from "../../mocks";

describe("LinkDialog", () => {
  const ui = editorUi;
  const initialValue = "www.link.com";
  const btnLabel = "linked";
  const fn = () => {};
  const documentMode = "x";
  const opts = {
    documentMode,
  };

  let dialog;
  beforeAll(() => {
    dialog = new LinkDialog(ui, initialValue, btnLabel, fn, opts);
  });

  // See: https://www.npmjs.com/package/jscolor-picker

  describe("created", () => {
    beforeAll(() => {
      dialog = new LinkDialog(ui, initialValue, btnLabel, fn, opts);
    });

    test("editorUi set", () => {
      expect(dialog.editorUi).toBe(editorUi);
    });

    describe("init", () => {
      dialog.init();

      test("sets focus on linkInput", () => {
        expect(dialog.linkInput.focus).toBeTruthy();
      });
    });

    describe("container", () => {
      test("is set", () => {
        expect(dialog.container).toBeDefined();
      });
    });

    describe("documentMode", () => {
      test("is set", () => {
        expect(dialog.documentMode).toEqual(documentMode);
      });
    });

    describe("inner", () => {
      test("is set", () => {
        expect(dialog.inner).toBeDefined();
      });
    });

    describe("linkInput", () => {
      test("is set", () => {
        expect(dialog.linkInput).toBeDefined();
      });
    });

    describe("cross", () => {
      test("is set", () => {
        expect(dialog.cross).toBeDefined();
      });
    });

    describe("btns", () => {
      test("is set", () => {
        expect(dialog.btns).toBeDefined();
      });
    });

    describe("cancelBtn", () => {
      test("is set", () => {
        expect(dialog.cancelBtn).toBeDefined();
      });
    });

    describe("mainBtn", () => {
      test("is set", () => {
        expect(dialog.mainBtn).toBeDefined();
      });
    });
  });
});
