import React from "react";
import { mount } from "enzyme";
import App from "./";

describe("<App/>", () => {
  it("renders without crashing", () => {
    mount(<App />);
  });
});
