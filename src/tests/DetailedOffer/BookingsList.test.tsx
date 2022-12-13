import React from "react";
import { render } from "@testing-library/react";
import { useQuery } from "react-query";
import BookingsList from "../../components/DetailedOffer/BookingsList";
import { BookingWithFullMember } from "../../types";

const mockedUseUsersQuery = useQuery as jest.Mock;

// Get mock data
const getSingleBooking = (id: number, name: string): BookingWithFullMember => ({
  coach: 1,
  coach_override: 1,
  consumer: 2,
  custom_level: 2,
  establishment: 48,
  is_discardable: true,
  id,
  level: 2,
  member: {
    consumer: 2,
    id: 123,
    name,
    tags: [],
    vaccination_status: "VACCINATED",
  },
  meta_activity: 1,
  offer: 1,
  offer_date_start: "2021-09-01T09:00:00Z",
  offer_duration_minute: 60,
  spot_id: 1,
});

export const bookingsList: BookingWithFullMember[] = [
  getSingleBooking(1, "John Doe"),
  getSingleBooking(2, "Jane Doe"),
  getSingleBooking(3, "John Doe 2"),
  getSingleBooking(4, "Jane Doe 2"),
  getSingleBooking(5, "John Doe 3"),
];

// Mock the hook module
jest.mock("react-query");

global.ResizeObserver = require("resize-observer-polyfill");

describe("Bookings list", () => {
  beforeEach(() => {
    mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<BookingsList bookingsIds={[]} />);
  });

  it("should display the loader", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: true,
    }));
    const { getByTestId } = render(<BookingsList bookingsIds={[]} />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should display a message when there is no data", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      data: [],
    }));
    const { getByTestId } = render(<BookingsList bookingsIds={[]} />);
    const noDataElement = getByTestId("no data");
    expect(noDataElement).toBeInTheDocument();
    expect(noDataElement).toHaveTextContent(
      "Aucune réservation pour le moment !"
    );
  });

  it("should display the bookings list", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      data: bookingsList,
    }));
    const { getByText } = render(<BookingsList bookingsIds={[]} />);
    // All the list items must be there
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
    expect(getByText("John Doe 2")).toBeInTheDocument();
    expect(getByText("Jane Doe 2")).toBeInTheDocument();
    expect(getByText("John Doe 3")).toBeInTheDocument();
  });
});
