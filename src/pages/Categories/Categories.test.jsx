import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Categories from "./Categories";
import movieData from "./movies.json";
import { BrowserRouter as Router } from "react-router-dom";

const mockMovies = [
  {
      id: 1,
      title: "Movie Title 1",
      actors: "Actor 1, Actor 2",
      genre: "Action",
      thumbnail: "thumbnail1.jpg",
  },
  {
      id: 2,
      title: "Movie Title 2",
      actors: "Actor 3, Actor 4",
      genre: "Drama",
      thumbnail: "thumbnail2.jpg",
  },
];

describe("Categories component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Categories />
      </Router>
    );
  });

  it("Categorizes movies by genre correctly on intial render", () => {
    const uniqueGenres = new Set();
    movieData.forEach((movie) => {
      movie.genre.split(", ").forEach((genre) => {
        uniqueGenres.add(genre);
      });
    });


    fireEvent.click(screen.getByRole("button", { name: /Category/ }));

   
    uniqueGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it("toggle the menu visiblity when the button is clicked", () => {
    const menuButton = screen.getByRole("button", { name: /Category Menu/ });

 
    expect(
      screen.queryByText(movieData[0].genre.split(", ")[0])
    ).not.toBeInTheDocument();
   
    fireEvent.click(menuButton);
  
    const firstGenre = movieData[0].genre.split(", ")[0];
    expect(screen.getByText(firstGenre)).toBeInTheDocument();
  });

  it("sets the selected genre and hides the menu after selection", () => {
    const menuButton = screen.getByRole("button", { name: /Category Menu/ });

    fireEvent.click(menuButton);
    const firstGenre = movieData[0].genre.split(", ")[0];
    fireEvent.click(screen.getByText(firstGenre));

 
    expect(screen.queryByRole("heading", { level: 2 })).toHaveTextContent(
      firstGenre
    );
  });

  it("renders all movies correctly", () => {
    const movieTitles = movieData.map(movie => movie.title);
    movieTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("navigates to movie detail when a movie card is clicked", () => {
    const firstMovieTitle = movieData[0].title;

    fireEvent.click(screen.getByText(firstMovieTitle));

    // Expect the correct encoded URL path
    expect(window.location.pathname).toBe("/movie/" + encodeURIComponent(firstMovieTitle));
});

  it('displays movie title correctly when selected', async () => {
    const firstMovieTitle = movieData[0].title; // Adjust this based on your mock or actual data

    // Wait for the movie title to be rendered
    await waitFor(() => {
      expect(screen.getByText(firstMovieTitle)).toBeInTheDocument(); // Check if the movie title is displayed
    });

    // Check the image
    const movieImage = screen.getByAltText(firstMovieTitle);
    expect(movieImage).toHaveAttribute('src', expect.stringContaining('MV5B')); // Check part of the image URL
  });


});
// });


