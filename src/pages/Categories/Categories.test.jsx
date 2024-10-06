import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Categories from "./Categories";
import movieData from "./movies.json";
import { BrowserRouter as Router } from "react-router-dom";
// import { MovieDetailes } from "../MovieDetailes/MovieDetailes";

describe("categories component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Categories />
      </Router>
    );
  });
  it("Categorizes movies by gener correctly on intial render", () => {
    const uniqueGenres = new Set();
    movieData.forEach((movie) => {
      movie.genre.split(", ").forEach((genre) => {
        uniqueGenres.add(genre);
      });
    });
    //klicka för att vissa genre-menyn
    fireEvent.click(screen.getByText(/Categori/i));
    // kontrollera att alla unika genrer fins i menyn
    uniqueGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });
  describe("toggleMenu function", () => {
    it("toggles the menu visibility when the button is clicked", () => {
      const menuButton = screen.getByText(/Categori/i);

      // Kontrollera att menyn inte är synlig i början
      expect(
        screen.queryByText(movieData[0].genre.split(", ")[0])
      ).not.toBeInTheDocument();

      // Klicka på knappen för att visa menyn
      fireEvent.click(menuButton);

      // Kontrollera att menyn nu är synlig
      const firstGenre = movieData[0].genre.split(", ")[0];
      expect(screen.getByText(firstGenre)).toBeInTheDocument();

      // Klicka igen för att dölja menyn
      fireEvent.click(menuButton);

      // Kontrollera att menyn har dolts
      expect(screen.queryByText(firstGenre)).not.toBeInTheDocument();
    });
  });
  describe("handelGenreSelection function", () => {
    it("set the selected genre and hides the menu after selection", () => {
      fireEvent.click(screen.getByText(/Categori/));

      const firstGenre = movieData[0].genre.split(", ")[0];
      fireEvent.click = screen.getByText(firstGenre);

      //kontrollera att den valda genren vissas
      expect(screen.queryByText(firstGenre)).toBeInTheDocument();
      expect(
        screen.queryByText(movieData[1].genre.split(", ")[0])
      ).toBeInTheDocument();
    });
  });
});
