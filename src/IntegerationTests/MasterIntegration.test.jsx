import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from '../pages/HomePage/HomePage';
import Categories from '../pages/Categories/Categories';
import FilmView from '../pages/FilmView/FilmView';
import Bookmarks from '../components/Bookmarks/Bookmarks';
import movieData from '../pages/Categories/movies.json';

describe('Master Integration Tests', () => {
  it('should render the homepage with all sections', () => {
    // Render the homepage in a simulated router
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    // important that homepage elements are rendered
    expect(screen.getByText(/Trending now/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommended for you/i)).toBeInTheDocument();
  });

  it('should navigate to categories and show genres', () => {
    // Render Categories page in the router
    render(
      <MemoryRouter initialEntries={['/categories']}>
        <Routes>
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </MemoryRouter>
    );

    //open genre menu
    fireEvent.click(screen.getByRole('button', { name: /Category/i }));

    //show all genres are shown
    const uniqueGenres = new Set();
    movieData.forEach((movie) => {
      movie.genre.split(', ').forEach((genre) => uniqueGenres.add(genre));
    });
    uniqueGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('should navigate to a film view and render movie details', () => {
    // movie details page
    render(
      <MemoryRouter initialEntries={['/movie/The Shawshank Redemption']}>
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
        </Routes>
      </MemoryRouter>
    );

    //movie details show
    expect(screen.getByText(/The Shawshank Redemption/i)).toBeInTheDocument();
    expect(screen.getByText(/1994/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Tim Robbins, Morgan Freeman/i)
    ).toBeInTheDocument();
  });

  it('should add a movie to bookmarks and verify it in the bookmarks page', async () => {
    //user interaction for bookmarking
    render(
      <MemoryRouter initialEntries={['/movie/The Shawshank Redemption']}>
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
          <Route path="/bookmarks" element={<Bookmarks />} />{' '}
        </Routes>
      </MemoryRouter>
    );

    //adding the movie to bookmarks
    const bookmarkButton = await screen.findByText(/add to bookmark/i);
    fireEvent.click(bookmarkButton);
    expect(screen.getByText(/remove bookmark/i)).toBeInTheDocument();

    // Navigate to the Bookmarks page
    fireEvent.click(screen.getByRole('link', { name: /Bookmarks/i }));

    // Log out the bookmarks for debugging
    const storedBookmarks =
      JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    console.log('Stored bookmarks: ', storedBookmarks); // Check the content of localStorage

    // Check if the bookmarked movie appears in the list
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
  });

  it('should navigate back to the homepage from film view', async () => {
    //navigation between homepage and film view
    render(
      <MemoryRouter
        initialEntries={['/', '/movie/The Shawshank Redemption']}
        initialIndex={1}
      >
        <Routes>
          <Route path="/movie/:title" element={<FilmView />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/The Shawshank Redemption/i)).toBeInTheDocument();

    const backButton = screen.getByText('Go back');
    fireEvent.click(backButton);

    expect(screen.getByText(/Trending now/i)).toBeInTheDocument();
  });
});
