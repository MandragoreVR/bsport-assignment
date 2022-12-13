import React from "react";
import { render } from "@testing-library/react";
import DetailCardHeader from "../../components/DetailedOffer/DetailCardHeader";

it("should render without crashing", () => {
  render(<DetailCardHeader />);
});

it("should display the name and the picture", () => {
  const { getByText, getByTestId } = render(
    <DetailCardHeader offerName="Offer name" offerPicture="photo url" />
  );
  expect(getByTestId("header image")).toBeInTheDocument();
  expect(getByText("Offer name")).toBeInTheDocument();
});
