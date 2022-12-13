import React from "react";
import { render } from "@testing-library/react";
import { useQuery } from "react-query";
import { FullOffer } from "../../types";
import OffersList from "../../components/OffersList/OffersList";
import { BrowserRouter } from "react-router-dom";
import getTestOffer from "../getTestOffer";

const mockedUseUsersQuery = useQuery as jest.Mock;

// Get mock data
const testNotAvailableOffer: FullOffer = getTestOffer({
  available: false,
  id: 124,
  establishmentAddress: "1 rue de la paix",
  metaActivityName: "Test activity",
  date_start: "2022-12-25T10:00:00.000Z",
});

const testAvailableOffer: FullOffer = getTestOffer({
  available: true,
  id: 125,
  establishmentAddress: "1 rue de la paix",
  metaActivityName: "Test activity",
  date_start: "2022-12-25T10:00:00.000Z",
});

// Mock the hook module
jest.mock("react-query");

// Mock the setSelectedOffer function
const testSetSelectedOffer = jest.fn();

// Since OffersList uses useSearchParams, we need to wrap it in a BrowserRouter
const MockOffersList = () => (
  <BrowserRouter>
    <OffersList setSelectedOffer={testSetSelectedOffer} />
  </BrowserRouter>
);

describe("Offers list", () => {
  beforeEach(() => {
    mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<MockOffersList />);
  });

  it("should display the skeletons", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: true,
    }));
    const { getByTestId } = render(<MockOffersList />);
    expect(getByTestId("skeletons")).toBeInTheDocument();
  });

  // it("should not display the button to load more content", () => {
  //   mockedUseUsersQuery.mockImplementation(() => ({
  //     isLoading: false,
  //     data: {
  //       results: [testNotAvailableOffer, testAvailableOffer],
  //       count: 2,
  //     },
  //   }));
  //   const { getByTestId } = render(<MockOffersList />);
  //   const moreDataButton = getByTestId("load more results");
  //   expect(moreDataButton).not.toBeInTheDocument();
  // });

  //   it("should display the button to load more content", () => {
  //     mockedUseUsersQuery.mockImplementation(() => ({
  //       isLoading: false,
  //       data: {
  //         results: [testNotAvailableOffer, testAvailableOffer],
  //         count: 2,
  //       },
  //     }));
  //     const { getByTestId } = render(<MockOffersList />);
  //     const moreDataButton = getByTestId("load more results");
  //     expect(moreDataButton).toBeInTheDocument();
  //     expect(moreDataButton).toHaveTextContent("Charger plus de résultats");
  //   });
});
