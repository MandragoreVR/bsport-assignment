import React from "react";
import { render } from "@testing-library/react";
import Header from "../components/Header";

it("should render the header", () => {
  const { getByTestId } = render(<Header />);
  const headerElement = getByTestId("header-text");
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent("Calendrier des activités");
});
