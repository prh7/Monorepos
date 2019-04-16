import { render, shallow } from "enzyme";
import * as React from "react";
import { ImageExample } from "./../index";

describe("ImageExample", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<ImageExample />);
  });

  it("should render following snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
