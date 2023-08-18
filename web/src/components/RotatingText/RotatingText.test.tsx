import { render } from "@redwoodjs/testing/web";

import RotatingText from "./RotatingText";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("RotatingText", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<RotatingText />);
    }).not.toThrow();
  });
});
