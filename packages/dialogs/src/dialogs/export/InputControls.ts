export class InputControls {
  constructor() {}

  nameInput: any;
  zoomInput: any;
  imageFormatSelect: any;
  widthInput: any;
  heightInput: any;
  borderInput: any;
  transparentCheckbox: any;
  dpiSelect: any;
  customDpi: any;

  get controls() {
    const {
      nameInput,
      imageFormatSelect,
      zoomInput,
      widthInput,
      heightInput,
      borderInput,
      transparentCheckbox,
      dpiSelect,
      customDpi,
    } = this;
    return {
      nameInput,
      imageFormatSelect,
      zoomInput,
      widthInput,
      heightInput,
      borderInput,
      transparentCheckbox,
      dpiSelect,
      customDpi,
    };
  }
}
