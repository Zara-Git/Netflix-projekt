import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Categories from './Categories';
import movieData from './movies.json';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Categories component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Categories />
      </Router>
    );
  });

  it('Categorizes movies by genre correctly on intial render', () => {
    const uniqueGenres = new Set();
    movieData.forEach((movie) => {
      movie.genre.split(', ').forEach((genre) => {
        uniqueGenres.add(genre);
      });
    });

    //klicka för att vissa genre-menyn
    fireEvent.click(screen.getByRole('button', { name: /Category/ }));

    // kontrollera att alla unika genrer fins i menyn
    uniqueGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });
  it('toggle the menu visiblity when the button is clicked', () => {
    const menuButton = screen.getByRole('button', { name: /Category/ });

    //check that menu is not visible initially
    expect(
      screen.queryByText(movieData[0].genre.split(', ')[0])
    ).not.toBeInTheDocument();
    // click to show genre menu
    fireEvent.click(menuButton);
    //kontrollera att menyn är synlig
    const firstGenre = movieData[0].genre.split(', ')[0];
    expect(screen.getByText(firstGenre)).toBeInTheDocument();
  });

  it('sets the selected genre and hides the menu after selection', () => {
    const menuButton = screen.getByRole('button', { name: /Category/ });
    fireEvent.click(menuButton);
    const firstGenre = movieData[0].genre.split(', ')[0];
    fireEvent.click(screen.getByText(firstGenre));

    //kontrollera att den valda genren vissas som en rubrik
    expect(screen.queryByRole('heading', { level: 2 })).toHaveTextContent(
      firstGenre
    );
  });
});
// });
