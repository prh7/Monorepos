import { render, shallow } from "enzyme";
import * as React from "react";
import { Example } from "./../index";

describe("Example", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<Example color={"blue"} />);
  });

  it("should contain dom", () => {
    expect(wrapper.contains(
      <div className="example" style={{color: "blue"}}>This is the super useful example component!</div>,
    )).toBe(true);
  });

  it("should work with snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("should be blue", () => {
    expect(render(wrapper).css("color")).toBe("blue");
  });

  it("should be green", () => {
    expect(render(<Example color={"green"} />).css("color")).toBe("green");
  });
});
