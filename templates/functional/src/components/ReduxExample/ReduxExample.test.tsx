import { render, shallow } from "enzyme";
import * as React from "react";
import { ReduxExample } from "./index";

describe("ReduxExample", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ReduxExample color={"blue"} />);
  });

  it("should contain dom", () => {
    expect(wrapper.contains(
      <div className="redux-example" style={{color: "blue"}}>This is the super useful example component!</div>,
    )).toBe(true);
  });

  it("should work with snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("should be blue", () => {
    expect(render(wrapper).css("color")).toBe("blue");
  });

  it("should be green", () => {
    expect(render(<ReduxExample color={"green"} />).css("color")).toBe("green");
  });
});
