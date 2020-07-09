import { ChangePageSetup } from "../..";

import { editorUi } from "../mocks";

describe("ChangePageSetup", () => {
  const ui = editorUi;
  const color = "white";
  const image = undefined;
  const format = undefined;
  const pageScale = undefined;
  // previousPageScale, previousFormat, previousImage, previousColor
  let setup;
  beforeAll(() => {
    setup = new ChangePageSetup(ui, color, image, format, pageScale);
  });

  test("previousColor", async () => {
    expect(setup.previousColor).toBe(color);
  });

  test("previousImage", async () => {
    expect(setup.previousImage).toBe(image);
  });

  test("previousFormat", async () => {
    expect(setup.previousFormat).toBe(format);
  });

  test("previousPageScale", async () => {
    expect(setup.previousPageScale).toBe(pageScale);
  });
});
