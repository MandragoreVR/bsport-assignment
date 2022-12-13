import React from "react";
import { render } from "@testing-library/react";
import { useQuery } from "react-query";
import { Coach } from "../../types";
import CoachCard from "../../components/DetailedOffer/CoachCard";

const mockedUseUsersQuery = useQuery as jest.Mock;

// Get mock data
const testCoachWithNameAndPicture: Coach = {
  associatedcoach_set: [],
  user: {
    photo: "photo url",
    name: "John Doe",
  },
};

const testBasicCoach: Coach = {
  associatedcoach_set: [],
  user: {},
};

// Mock the hook module
jest.mock("react-query");

describe("Coach card", () => {
  beforeEach(() => {
    mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<CoachCard />);
  });

  it("should display the loader", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: true,
    }));
    const { getByTestId } = render(<CoachCard />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should display some default values with undefined", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      data: undefined,
    }));
    const { getByText, getByTestId } = render(<CoachCard />);
    expect(getByTestId("coach avatar")).toBeInTheDocument();
    expect(getByText("Inconnu")).toBeInTheDocument();
  });

  it("should display some default values with basic coach", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      data: testBasicCoach,
    }));
    const { getByText, getByTestId } = render(<CoachCard />);
    expect(getByTestId("coach avatar")).toBeInTheDocument();
    expect(getByText("Inconnu")).toBeInTheDocument();
  });

  it("should display the coach card", () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      data: testCoachWithNameAndPicture,
    }));
    const { getByText, getByTestId } = render(<CoachCard />);
    expect(getByTestId("coach avatar")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
  });
});
