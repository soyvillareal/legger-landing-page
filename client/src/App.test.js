import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

import FormLanding from "./components/FormLanding/FormLanding";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("Testing form", () => {
  it("Should be required", () => {
    render(
      <MemoryRouter>
        <FormLanding />
      </MemoryRouter>
    );

    const clientName = screen.queryByTestId("clientName");
    const nit = screen.queryByTestId("nit");
    const terms = screen.queryByTestId("terms");

    expect(clientName).toHaveAttribute("required");
    expect(nit).toHaveAttribute("required");
    expect(terms).toHaveAttribute("required");
  });

  it("The attribute should be select and the options: cali, medellin, bogota", () => {
    render(
      <MemoryRouter>
        <FormLanding />
      </MemoryRouter>
    );

    const city = screen.queryByTestId("city");
    const city_option = screen.queryAllByTestId("city-option");

    expect(city.tagName.toLowerCase()).toBe("select");

    city_option.forEach((i) => {
      expect(i.value).toMatch(/cali|medellin|bogota/i);
    });
  });

  it("should be empty in case of entering numbers or special characters.", () => {
    render(
      <MemoryRouter>
        <FormLanding />
      </MemoryRouter>
    );

    const input = screen.queryByTestId("clientName");
    fireEvent.change(input, { target: { value: "123456#'?" } });

    expect(input.value).toBe("");
  });

  it("should be empty in case of entering: #¿?,", () => {
    render(
      <MemoryRouter>
        <FormLanding />
      </MemoryRouter>
    );

    const inputs = screen.queryAllByTestId("general");

    inputs.forEach((i) => {
      fireEvent.change(i, { target: { value: "#¿?," } });
      expect(i.value).toBe("");
    });
  });

  it("Should only accept numbers and if it is a letter, it should be empty", () => {
    render(
      <MemoryRouter>
        <FormLanding />
      </MemoryRouter>
    );

    const input = screen.queryByTestId("rtc");
    fireEvent.change(input, { target: { value: "abcd" } });

    expect(input.value).toBe("");
  });

  it("Should register in hidden fields (hidden) the following information: ip, hour and current date", () => {
    render(
      <MemoryRouter>
        <FormLanding />
      </MemoryRouter>
    );

    const ip = screen.queryByTestId("ip");
    const hour = screen.queryByTestId("hour");
    const date = screen.queryByTestId("date");

    expect(ip).toBeInTheDocument();
    expect(hour).toBeInTheDocument();
    expect(date).toBeInTheDocument();

    expect(ip).toHaveAttribute("type", "hidden");
    expect(hour).toHaveAttribute("type", "hidden");
    expect(date).toHaveAttribute("type", "hidden");
  });
});
