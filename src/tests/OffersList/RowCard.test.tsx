import React from "react";
import { render } from "@testing-library/react";
import RowCard from "../../components/OffersList/RowCard";
import { FullOffer } from "../../types";
import getTestOffer from "../getTestOffer";

const testNotAvailableOffer: FullOffer = getTestOffer({
  available: false,
  establishmentAddress: "1 rue de la paix",
  metaActivityName: "Test activity",
  date_start: "2022-12-25T10:00:00.000Z",
});

const testAvailableOffer: FullOffer = getTestOffer({
  available: true,
  establishmentAddress: "1 rue de la paix",
  metaActivityName: "Test activity",
  date_start: "2022-12-25T10:00:00.000Z",
});

const testSetSelectedOffer = jest.fn();

it("should render without crashing", () => {
  render(
    <RowCard
      offer={testNotAvailableOffer}
      setSelectedOffer={testSetSelectedOffer}
    />
  );
});

it("should display all the information", () => {
  const { getByText, getByTestId } = render(
    <RowCard
      offer={testNotAvailableOffer}
      setSelectedOffer={testSetSelectedOffer}
    />
  );
  expect(getByTestId("image")).toBeInTheDocument();
  expect(getByText("Test activity")).toBeInTheDocument();
  expect(getByText("1 rue de la paix")).toBeInTheDocument();
  expect(
    getByText("Dimanche 25 Décembre 2022 - 11:00 (1h)")
  ).toBeInTheDocument();
  expect(getByText("Places indisponibles")).toBeInTheDocument();
});

it("should display that the offer is available", () => {
  const { getByText } = render(
    <RowCard
      offer={testAvailableOffer}
      setSelectedOffer={testSetSelectedOffer}
    />
  );
  expect(getByText("Places disponibles")).toBeInTheDocument();
});

it("should call setSelectedOffer", () => {
  const { getByTestId } = render(
    <RowCard
      offer={testAvailableOffer}
      setSelectedOffer={testSetSelectedOffer}
    />
  );
  getByTestId("row card").click();
  expect(testSetSelectedOffer).toBeCalledTimes(1);
});
