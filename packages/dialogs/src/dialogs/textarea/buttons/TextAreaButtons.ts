import mx from "@mxgraph-app/mx";
import { DialogButtons } from "../../../dialogs/base";
const { mxUtils, mxResources } = mx;

export class TextAreaButtons extends DialogButtons {
  btnsWrapper: any;
  customButtons: any;

  appendHelpBtn() {
    const { editorUi, btnsWrapper, helpLink } = this.dialog;
    if (!helpLink) return;
    var helpBtn = mxUtils.button(mxResources.get("help"), function () {
      editorUi.editor.graph.openLink(helpLink);
    });
    helpBtn.className = "geBtn";

    btnsWrapper.appendChild(helpBtn);
    return btnsWrapper;
  }

  editorUi: any;

  appendCustomBtn = (label, fn) => {
    const { btnsWrapper, nameInput } = this.dialog;
    var customBtn = mxUtils.button(label, function (e) {
      fn(e, nameInput);
    });
    customBtn.className = "geBtn";

    btnsWrapper.appendChild(customBtn);
  };

  get cancelFirst() {
    return this.editorUi.editor.cancelFirst;
  }

  createCancelBtn() {
    const { cancelTitle, editorUi, cancelFn } = this.dialog;
    var cancelBtn = mxUtils.button(
      cancelTitle || mxResources.get("cancel"),
      () => {
        editorUi.hideDialog();

        if (cancelFn != null) {
          cancelFn();
        }
      }
    );
    cancelBtn.className = "geBtn";
    this.cancelBtn = cancelBtn;
    return cancelBtn;
  }

  cancelBtn: any;
  fn: any;

  appendCancelBtn() {
    const { cancelFirst } = this;
    const cancelBtn = this.createCancelBtn();
    if (cancelFirst) {
      this.btnsWrapper.appendChild(cancelBtn);
    }
  }

  createBtns() {
    const btnsWrapper = document.createElement("td");
    btnsWrapper.style.paddingTop = "14px";
    btnsWrapper.style.whiteSpace = "nowrap";
    btnsWrapper.setAttribute("align", "right");
    this.btnsWrapper = btnsWrapper;

    const { customButtons } = this;

    if (customButtons != null) {
      for (var i = 0; i < customButtons.length; i++) {
        this.appendCustomBtn(customButtons[i][0], customButtons[i][1]);
      }
    }

    const {
      nameInput,
      cancelBtn,
      fn,
      addButtons,
      applyTitle,
      noHide,
      editorUi,
    } = this.dialog;

    if (addButtons != null) {
      addButtons(btnsWrapper, nameInput);
    }

    if (fn != null) {
      var genericBtn = mxUtils.button(
        applyTitle || mxResources.get("apply"),
        function () {
          if (!noHide) {
            editorUi.hideDialog();
          }

          fn(nameInput.value);
        }
      );

      genericBtn.className = "geBtn gePrimaryBtn";
      btnsWrapper.appendChild(genericBtn);
    }

    if (!editorUi.editor.cancelFirst) {
      btnsWrapper.appendChild(cancelBtn);
    }
  }
}
