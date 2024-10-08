import { render, screen } from "@testing-library/react";
import { BrowserRouter  } from "react-router-dom";
import { describe, test, expect } from "vitest";
import HomePage from "./HomePage";
// import movieData from "../../movies.json";

describe("HomePage component", () => {
  test("should render HomePage with all sections correctly", () => {
    // Render HomePage-komponenten inuti en Router
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Kontrollera att Header-komponenten visas
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    // Kontrollera att Carousel visas med "Trending now"-rubrik
    const trendingHeading = screen.getByText("Trending now");
    expect(trendingHeading).toBeInTheDocument();

      // Kontrollera att Carousel komponenten renderas med filmer
      const trendingMovies = screen.getAllByRole("img");
      expect(trendingMovies.length).toBeGreaterThan(0);

    // Kontrollera att Recommended for you rubriken renderas
    const recommendedTitle = screen.getByText(/Recommended for you/i);
    expect(recommendedTitle).toBeInTheDocument();

      // Kontrollera att den rekommenderade filmernas lista renderas
      const recommendedMovies = screen.getAllByRole("img");
      expect(recommendedMovies.length).toBeGreaterThan(0);

  });

});
