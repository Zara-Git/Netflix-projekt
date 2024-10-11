import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Categories from "./Categories";
import GenreMenu from "./GenreMenu";
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

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route); // Set the route
  return render(<Router>{ui}</Router>); // Render UI wrapped in Router
};

describe("Categories component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Categories movieData={movieData} />
      </Router>
    );
  });

  it("Categorizes movies by genre correctly on initial render", async () => {
    const uniqueGenres = new Set();
    movieData.forEach((movie) => {
      movie.genre.split(", ").forEach((genre) => {
        uniqueGenres.add(genre);
      });
    });
  
    fireEvent.click(screen.getByRole("button", { name: /Category/ }));
  
    await waitFor(() => {
      uniqueGenres.forEach((genre) => {
        const genreElements = screen.getAllByText(genre);
        expect(genreElements.length).toBeGreaterThan(0); 
      });
    });
  });


  it("toggles the menu visibility when the button is clicked", async () => {

    expect(screen.queryByLabelText('Genre Menu')).not.toBeInTheDocument(); 
  
    fireEvent.click(screen.getByLabelText('Category Menu'));
  
    await waitFor(() => {
      expect(screen.getByLabelText('Genre Menu')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByLabelText('Category Menu'));
  
    await waitFor(() => {
      expect(screen.queryByLabelText('Genre Menu')).not.toBeInTheDocument();
    });
  });
  
  it("sets the selected genre and hides the menu after selection", async () => {

    renderWithRouter(<Categories movieData={mockMovies} />);
  
    const menuButtons = screen.getAllByLabelText(/Category Menu/i);
    fireEvent.click(menuButtons[0]);

  
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  
    const genreMenu = screen.getByRole("menu");

    const genreItem = within(genreMenu).getByText("Drama");

    fireEvent.click(genreItem);

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

  
    const headings = screen.getAllByRole("heading", { level: 2 });
    const dramaHeading = headings.find((heading) => heading.textContent === "Drama");
    expect(dramaHeading).toBeInTheDocument();
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
    const firstMovieTitle = movieData[0].title; 

    await waitFor(() => {
      expect(screen.getByText(firstMovieTitle)).toBeInTheDocument();
    });

    // Check the image
    const movieImage = screen.getByAltText(firstMovieTitle);
    expect(movieImage).toHaveAttribute('src', expect.stringContaining('MV5B'));
  });


});



