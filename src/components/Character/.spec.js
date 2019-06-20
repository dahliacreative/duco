import React from "react";
import { mount } from "enzyme";
import Character from "./";

describe("<Character/>", () => {
  const historyMock = jest.fn();
  const props = {
    match: {
      params: {
        id: 14
      }
    },
    history: {
      goBack: historyMock
    }
  };

  it("renders without crashing", () => {
    mount(<Character {...props} />);
  });

  it("navigates back on close", done => {
    const component = mount(<Character {...props} />);
    const close = component.find("button");
    close.simulate("click");
    setTimeout(() => {
      expect(historyMock).toHaveBeenCalledTimes(1);
      done();
    }, 500);
  });
});
