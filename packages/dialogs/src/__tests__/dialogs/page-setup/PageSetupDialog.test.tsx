import { PageSetupDialog } from "../../..";

import { editorUi } from "../../mocks";

describe("PageSetupDialog", () => {
  const ui = editorUi;

  let dialog;
  beforeAll(() => {
    dialog = new PageSetupDialog(ui);
  });

  describe("created", () => {
    // let dialog;
    // beforeAll(() => {
    //   dialog = new PageSetupDialog(ui);
    // });

    // Note that the constructor will call, which will setup the pageFormat for PageSetupDialog
    // var accessor = PageSetupDialog.addPageFormatPanel(
    //   td,
    //   "pagesetupdialog",
    //   graph.pageFormat,
    //   undefined
    // );

    test("newBackgroundColor", () => {
      dialog = new PageSetupDialog(ui);
      expect(dialog.newBackgroundColor).toBeDefined();
    });
  });

  // describe.skip("updateBackgroundColor", () => {
  //   describe.skip("has newBackgroundColor", () => {});

  //   describe.skip("no newBackgroundColor", () => {
  //     let style;
  //     beforeAll(() => {
  //       dialog = new PageSetupDialog(ui);
  //       dialog.updateBackgroundColor();
  //       const { backgroundButton } = dialog;
  //       style = backgroundButton.style;
  //       console.log({ backgroundButton });
  //     });

  //     describe.skip("backgroundButton style", () => {
  //       test("defined", () => {
  //         expect(style).toBeDefined();
  //       });
  //     });
  //   });
  // });

  // describe.skip("updateBackgroundImage", () => {
  //   describe.skip("has newBackgroundImage", () => {});

  //   describe.skip("no newBackgroundColor", () => {});
  // });
});
