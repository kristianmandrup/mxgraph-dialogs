import { Openfile } from "../../..";

describe("Openfile", () => {
  const done = () => {};

  let dialog;
  beforeAll(() => {
    dialog = new Openfile(done);
  });

  test("done", () => {
    expect(dialog.done).toBe(done);
  });

  describe("setConsumer", () => {
    const value = "x";
    beforeAll(() => {
      dialog.setConsumer(value);
    });

    test("value set", () => {
      expect(dialog.consumer).toBe(value);
    });
  });

  describe.skip("setData", () => {});

  describe.skip("error", () => {});

  describe.skip("execute", () => {});

  describe.skip("cancel", () => {});
});
