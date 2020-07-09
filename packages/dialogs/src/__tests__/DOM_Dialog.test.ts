import { Dialog } from "..";
// import // getByLabelText,
// getByText,
// getByTestId,
// queryByTestId,
// Tip: all queries are also exposed on an object
// called "queries" which you could import here as well
// waitFor,
// "@testing-library/dom";
// adds special assertions like toHaveTextContent
// import "@testing-library/jest-dom/extend-expect";
import { editorUi } from "./mocks";

describe("Dialog", () => {
  let container;
  const elem = document.createElement("dialog");

  beforeAll(() => {
    const dialog = new Dialog(editorUi, elem, {});
    container = dialog;
  });

  test("container is dialog element", async () => {
    // getByTestId and queryByTestId are an escape hatch to get elements
    // by a test id (could also attempt to get this element by its text)
    expect(container).toBeDefined();
  });

  test.skip("container matches snapshot", async () => {
    // jest snapshots work great with regular DOM nodes!
    expect(container).toMatchSnapshot();
  });
});
