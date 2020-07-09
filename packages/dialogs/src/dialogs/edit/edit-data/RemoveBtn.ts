import { Dialog } from "../../../dialog/Dialog";
import mx from "@mxgraph-app/mx";
import { BaseBtn } from "./BaseBtn";
const { mxEvent, mxClient, mxUtils, mxResources } = mx;

export class RemoveBtn extends BaseBtn {
  removeAttr?: HTMLElement;
  wrapper?: HTMLElement;
  img?: HTMLImageElement;
  text: any;

  addRemoveButton = (text, _name) => {
    this.text = text;
    this.createWrapper();
    this.createRemoveAttr();
  };

  createWrapper() {
    var wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.paddingRight = "20px";
    wrapper.style.boxSizing = "border-box";
    wrapper.style.width = "100%";
    this.wrapper = wrapper;
    return wrapper;
  }

  createImg() {
    var img = mxUtils.createImage(Dialog.prototype.closeImage);
    img.style.height = "9px";
    img.style.fontSize = "9px";
    img.style.marginBottom = mxClient.IS_IE11 ? "-1px" : "5px";
    this.img = img;
    return img;
  }

  removeAttrFn = (name) => {
    const { names, texts, form, id } = this;
    var count = 0;

    for (var j = 0; j < names.length; j++) {
      if (names[j] == name) {
        texts[j] = null;
        form && form.table.deleteRow(count + (id != null ? 1 : 0));

        break;
      }

      if (texts[j] != null) {
        count++;
      }
    }
  };

  createRemoveAttr() {
    const img = this.createImg();
    var removeAttr = document.createElement("a");
    removeAttr.className = "geButton";
    removeAttr.setAttribute("title", mxResources.get("delete"));
    removeAttr.style.position = "absolute";
    removeAttr.style.top = "4px";
    removeAttr.style.right = "0px";
    removeAttr.style.margin = "0px";
    removeAttr.style.width = "9px";
    removeAttr.style.height = "9px";
    removeAttr.style.cursor = "pointer";
    removeAttr.appendChild(img);

    mxEvent.addListener(removeAttr, "click", this.removeAttrFn);
    const { wrapper, text } = this;

    var parent = text.parentNode;
    if (wrapper) {
      wrapper.appendChild(text);
      wrapper.appendChild(removeAttr);
    }
    parent.appendChild(wrapper);

    this.removeAttr = removeAttr;
    return removeAttr;
  }
}
