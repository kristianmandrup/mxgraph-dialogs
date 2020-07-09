import mx from "@mxgraph-app/mx";
const { mxResources, mxUtils } = mx;

/**
 *
 */
export class ErrorDialog {
  btn: any;
  container: any;

  message: any;
  buttonText: any;

  createMainDiv() {
    var div = document.createElement("div");
    div.style.textAlign = "center";
    return div;
  }

  createParagraph() {
    const { message } = this;
    var p2 = document.createElement("div");
    p2.style.lineHeight = "1.2em";
    p2.style.padding = "6px";
    p2.innerHTML = message;
    return p2;
  }

  btns: any;

  createBtns() {
    var btns = document.createElement("div");
    btns.style.marginTop = "12px";
    btns.style.textAlign = "center";
    this.btns = btns;
    return btns;
  }

  retry: any;

  createRetryBtn() {
    const { retry, editorUi } = this;
    var retryBtn = mxUtils.button(mxResources.get("tryAgain"), function () {
      editorUi.hideDialog();
      retry();
    });
    retryBtn.className = "geBtn";
    return retryBtn;
  }

  appendRetryBtn() {
    const { retry, btns } = this;
    if (!retry) return;
    const retryBtn = this.createRetryBtn();
    btns.appendChild(retryBtn);
  }

  appendBtn3() {
    const { buttonText3, fn3, btns } = this;
    if (!buttonText3) return;
    var btn3 = mxUtils.button(buttonText3, function () {
      if (fn3 != null) {
        fn3();
      }
    });

    btn3.className = "geBtn";
    btns.appendChild(btn3);
    return btns;
  }

  appendMainBtn() {
    const { buttonText2, fn2, editorUi, hide, btns } = this;
    if (!buttonText2) return;
    var mainBtn = mxUtils.button(buttonText2, function () {
      if (hide) {
        editorUi.hideDialog();
      }

      if (fn2 != null) {
        fn2();
      }
    });

    mainBtn.className = "geBtn gePrimaryBtn";
    btns.appendChild(mainBtn);
    return btns;
  }

  appendBtn() {
    const { buttonText, fn, editorUi, hide, btns } = this;
    var btn = mxUtils.button(buttonText, function () {
      if (hide) {
        editorUi.hideDialog();
      }

      if (fn != null) {
        fn();
      }
    });

    btn.className = "geBtn";
    btns.appendChild(btn);
    return btns;
  }

  editorUi: any;
  hide: any;
  fn: any;
  buttonText2: any;
  fn2: any;
  buttonText3: any;
  fn3: any;

  constructor(editorUi, title, message, buttonText, opts: any = {}) {
    let { fn, retry, buttonText2, fn2, hide, buttonText3, fn3 } = opts;
    hide = hide != null ? hide : true;
    this.fn = fn;
    this.buttonText2 = buttonText2;
    this.fn2 = fn2;

    this.buttonText3 = buttonText3;
    this.fn3 = fn3;
    this.hide = hide;
    this.editorUi = editorUi;
    this.retry = retry;
    this.title = title;
    this.message = message;
    this.buttonText = buttonText;

    const div = this.createMainDiv();
    this.appendTitle(div);
    const p2 = this.createParagraph();
    div.appendChild(p2);
    const btns = this.createBtns();

    btns.style.textAlign = "center";

    this.appendBtn3();
    this.appendMainBtn();
    this.appendBtn();

    this.appendMainBtn();
    div.appendChild(btns);

    this.container = div;
  }

  titleElem: any;
  title: any;

  createTitle() {
    const { title } = this;
    if (!title) return;
    var hd = document.createElement("div");
    hd.style.padding = "0px";
    hd.style.margin = "0px";
    hd.style.fontSize = "18px";
    hd.style.paddingBottom = "16px";
    hd.style.marginBottom = "10px";
    hd.style.borderBottom = "1px solid #c0c0c0";
    hd.style.color = "gray";
    hd.style.whiteSpace = "nowrap";
    hd.style.textOverflow = "ellipsis";
    hd.style.overflow = "hidden";
    mxUtils.write(hd, title);
    hd.setAttribute("title", title);
    this.titleElem = hd;
    return hd;
  }

  appendTitle(div) {
    const { titleElem } = this;
    div.appendChild(titleElem);
    return div;
  }

  init() {
    this.btn.focus();
  }
}
