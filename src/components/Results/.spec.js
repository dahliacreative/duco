import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { mount } from "enzyme";
import Results from "./";
import { Provider } from "../../data/characters";

describe("<Results />", () => {
  it("renders without crashing", () => {
    const component = mount(
      <MemoryRouter>
        <Provider
          data={[
            {
              name: "Han Solo",
              url: "https://swapi.co/api/people/14/"
            }
          ]}
        >
          <Results />
        </Provider>
      </MemoryRouter>
    );
    const result = component.find(Link);
    expect(result.text()).toBe("Han Solo");
  });
});
