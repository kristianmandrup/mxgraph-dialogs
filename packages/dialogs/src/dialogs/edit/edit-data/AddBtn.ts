import mx from "@mxgraph-app/mx";
import { EditDataDialog } from "./EditDataDialog";
import { BaseBtn } from "./BaseBtn";
const { mxUtils, mxResources } = mx;

export class AddBtn extends BaseBtn {
  addBtn: any;

  constructor(dialog: EditDataDialog) {
    super(dialog);
    this.createAddBtn();
    this.configure();
  }

  get addRemoveButton(): any {
    return this.dialog.addRemoveButton;
  }

  createAddBtn() {
    const { nameInput } = this;

    this.addBtn = mxUtils.button(mxResources.get("addProperty"), () => {
      var name = nameInput.value;

      // Avoid ':' in attribute names which seems to be valid in Chrome
      if (
        name.length > 0 &&
        name != "label" &&
        name != "placeholders" &&
        name.indexOf(":") < 0
      ) {
        try {
          const { names, texts, value, form, addRemoveButton } = this;
          var idx = mxUtils.indexOf(names, name);

          if (idx >= 0 && texts[idx] != null) {
            texts[idx].focus();
          } else {
            // Checks if the name is valid
            var clone = value.cloneNode(false);
            clone.setAttribute(name, "");

            if (idx >= 0) {
              names.splice(idx, 1);
              texts.splice(idx, 1);
            }

            names.push(name);
            var text = form.addTextarea(name + ":", "", 2);
            text.style.width = "100%";
            texts.push(text);
            addRemoveButton(text, name);

            text.focus();
          }

          this.addBtn.setAttribute("disabled", "disabled");
          nameInput.value = "";
        } catch (e) {
          mxUtils.alert(e);
        }
      } else {
        mxUtils.alert(mxResources.get("invalidName"));
      }
    });
  }

  configure() {
    const { addBtn } = this;
    addBtn.setAttribute("title", mxResources.get("addProperty"));
    addBtn.setAttribute("disabled", "disabled");
    addBtn.style.textOverflow = "ellipsis";
    addBtn.style.position = "absolute";
    addBtn.style.overflow = "hidden";
    addBtn.style.width = "144px";
    addBtn.style.right = "0px";
    addBtn.className = "geBtn";
    return addBtn;
  }
}
