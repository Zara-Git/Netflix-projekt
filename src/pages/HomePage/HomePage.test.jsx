import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";
import HomePage from "./HomePage";
// import movieData from "../../movies.json";
import Search from "../../components/Search/Search";

describe("HomePage component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });

  test.only("should render HomePage with all sections correctly", () => {
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const trendingHeading = screen.getByText(/Trending now/i);
    expect(trendingHeading).toBeInTheDocument();

    const carouselElm = screen.getByTestId("carousel");
    expect(carouselElm).toBeInTheDocument();

    const recommendedTitle = screen.getByText(/Recommended for you/i);
    expect(recommendedTitle).toBeInTheDocument();
  });

  test("should render No recommended movie found when there are no random movies", async () => {
    vi.mock("../../movies.json", () => {
      return {
        default: [],
      };
    });
    const noMovieText = await waitFor(() =>
      screen.getByText(/No recommended movie found/i)
    );

    expect(noMovieText).toBeVisible();
    expect(noMovieText).toBeInTheDocument();
  });

  test("Search Input updates on change", () => {
    const { queryByPlaceholderText } = render(Search);
    const searchInput = queryByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });

  test("Search Input is empty", ()=> {
    const { queryByPlaceholderText } = render(Search);
    const searchInput = queryByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(searchInput.value).toBe("");
  })

  test.only("Search Input is shown error message 'No movie found' when no movie is found in database", ()=> {
    const { getByPlaceholderText } = render(Search);
    const searchInput = getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "jdjd" } });
    const errorMessage = screen.getByText("No movie found.")
    expect(errorMessage).toBeInTheDocument();
  })
});