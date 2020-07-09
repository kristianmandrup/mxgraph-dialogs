import mx from "@mxgraph-app/mx";
import { BaseDialogBtn } from "packages/dialogs/src/dialogs/base";
const { mxUtils } = mx;

export class GenericBtn extends BaseDialogBtn {
  get validateFn() {
    return this.dialog.validateFn;
  }

  get buttonText() {
    return this.dialog.validateFn;
  }

  get nameInput() {
    return this.dialog.validateFn;
  }

  get closeOnBtn() {
    return this.dialog.validateFn;
  }

  get fn() {
    return this.dialog.validateFn;
  }

  createBtn() {
    const { validateFn, buttonText, nameInput, closeOnBtn, ui, fn } = this;
    var genericBtn = mxUtils.button(buttonText, function () {
      if (validateFn == null || validateFn(nameInput.value)) {
        if (closeOnBtn) {
          ui.hideDialog();
        }

        fn(nameInput.value);
      }
    });
    genericBtn.className = "geBtn gePrimaryBtn";
    this.btn = genericBtn;
    return genericBtn;
  }
}
