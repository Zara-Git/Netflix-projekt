// import { describe, test, expect, beforeEach, vi } from "vitest";
// import Fuse from "fuse.js";

// const mockMovies = [
//   {
//     title: "Inception",
//     year: 2010,
//     rating: "PG-13",
//     actors: ["Leonardo DiCaprio"],
//     genre: "Sci-Fi",
//   },
//   {
//     title: "The Dark Knight",
//     year: 2008,
//     rating: "PG-13",
//     actors: ["Christian Bale"],
//     genre: "Action",
//   },
// ];

// const fuse = new Fuse(mockMovies, {
//   keys: ["title", "genre", "actors"],
//   threshold: 0.3,
//   includeScore: true,
// });

// describe("Fuse.js search functionality", () => {

//   test("returns correct movie when searching by title", () => {
//     const result = fuse.search("Inception");

//     expect(result.length).toBe(1);
//     expect(result[0].item.title).toBe("Inception");
//   });

//   test("returns correct movie when searching by actor", () => {
//     const result = fuse.search("Leonardo DiCaprio");

//     expect(result.length).toBe(1);
//     expect(result[0].item.title).toBe("Inception");
//   });

//   test("returns correct movies when searching by genre", () => {
//     const result = fuse.search("Action");

//     expect(result.length).toBe(1);
//     expect(result[0].item.title).toBe("The Dark Knight");
//   });

//   test("returns empty array when no match is found", () => {
//     const result = fuse.search("Non-existent movie");

//     expect(result.length).toBe(0);
//   });
// });

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Search from '../Search/Search'; // Update this path if necessary
import Fuse from 'fuse.js';
import { MemoryRouter } from 'react-router-dom';

// Define mock movie data
const mockMovies = [
  {
    title: 'Inception',
    year: 2010,
    rating: 'PG-13',
    actors: ['Leonardo DiCaprio'],
    genre: 'Sci-Fi',
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    rating: 'PG-13',
    actors: ['Christian Bale'],
    genre: 'Action',
  },
];

// Mock Fuse.js for handling fuzzy search
const fuse = new Fuse(mockMovies, {
  keys: ['title', 'genre', 'actors'],
  threshold: 0.3,
  includeScore: true,
});

// Test suite for Fuse.js search functionality
describe('Fuse.js search functionality', () => {
  test('returns correct movie when searching by title', () => {
    const result = fuse.search('Inception');

    expect(result.length).toBe(1);
    expect(result[0].item.title).toBe('Inception');
  });

  test('returns correct movie when searching by actor', () => {
    const result = fuse.search('Leonardo DiCaprio');

    expect(result.length).toBe(1);
    expect(result[0].item.title).toBe('Inception');
  });

  test('returns correct movies when searching by genre', () => {
    const result = fuse.search('Action');

    expect(result.length).toBe(1);
    expect(result[0].item.title).toBe('The Dark Knight');
  });

  test('returns empty array when no match is found', () => {
    const result = fuse.search('Non-existent movie');

    expect(result.length).toBe(0);
  });
});

// Mock navigate
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Test suite for Search component
describe('Search component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
  });

  test('Suggestions are shown on change', () => {
    const searchInput = screen.getByPlaceholderText('Search...'); // Corrected placeholder
    fireEvent.change(searchInput, { target: { value: 'inception' } });
    const movieSuggestion = screen.getByText('Inception');
    expect(movieSuggestion).toBeInTheDocument();
  });

  test("displays 'No movie found' when no matches are found", () => {
    const inputElement = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(inputElement, { target: { value: 'non-existent-movie' } });
    expect(screen.getByText('No movie found.')).toBeInTheDocument();
  });

  test('navigates to the movie view when a suggestion is clicked', () => {
    const inputElement = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(inputElement, { target: { value: 'inception' } });
    const movieSuggestion = screen.getByText('Inception');
    fireEvent.click(movieSuggestion);
    expect(navigateMock).toHaveBeenCalledWith('/movie/Inception');
  });
});
