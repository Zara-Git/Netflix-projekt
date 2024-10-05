import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Categories from "./Categories";
import movieData from "./movies.json";
import { BrowserRouter as Router } from "react-router-dom";

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
  //testa toggle menu funktionen
  it("taggles genre menu visiblity when the button is cliked ", () => {
    const menuBtton = screen.getByText(/Categori/i);
    //kontrollera att meny inte är synlig i början
    expect(
      screen.queryByText(movieData[0].genre.split(", ")[0])
    ).not.toBeInTheDocument();

    // klicka för att dölja menyn
    fireEvent.click(menuBtton);
  });
});
