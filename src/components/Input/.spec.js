import React from "react";
import { mount } from "enzyme";
import Input from "./";
import fixtures from "../../fixtures";

describe("<Input/>", () => {
  it("renders without crashing", () => {
    mount(<Input updateResults={() => {}} />);
  });

  it("has a working udate results handler", () => {
    const mock = jest.fn();
    mount(<Input updateResults={mock} />);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith([]);
  });

  it("throttles searching", done => {
    const mock = jest.fn();
    const component = mount(<Input updateResults={mock} />);
    const input = component.find("input");
    input.simulate("change", { target: { value: "han" } });
    setTimeout(() => {
      expect(mock).toHaveBeenCalledWith(
        fixtures["people/?search=han"].data.results
      );
      done();
    }, 500);
  });
});
