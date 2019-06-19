import React from "react";
import { mount } from "enzyme";
import Input from "./";

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
    const response = { results: "12345" };
    fetch.mockResponseOnce(JSON.stringify(response));
    const component = mount(<Input updateResults={mock} />);
    const input = component.find("input");
    input.simulate("change", { target: { value: "han" } });
    setTimeout(() => {
      expect(mock).toHaveBeenCalledWith(response.results);
      done();
    }, 500);
  });
});
