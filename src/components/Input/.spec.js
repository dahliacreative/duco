import React from "react";
import { mount } from "enzyme";
import Input from "./";
import fixtures from "../../fixtures";
import { Provider } from "../../data/characters";

describe("<Input/>", () => {
  it("renders without crashing", () => {
    mount(
      <Provider data={[]} updateResults={() => {}}>
        <Input />
      </Provider>
    );
  });

  it("has a working udate results handler", () => {
    const mock = jest.fn();
    mount(
      <Provider data={[]} updateResults={mock}>
        <Input />
      </Provider>
    );
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith([]);
  });

  it("throttles searching", done => {
    const mock = jest.fn();
    const component = mount(
      <Provider data={[]} updateResults={mock}>
        <Input />
      </Provider>
    );
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
