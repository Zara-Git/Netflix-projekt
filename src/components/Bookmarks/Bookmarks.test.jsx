/*import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bookmarks from './Bookmarks';

const mockMovies = [
  { id: 1, title: 'Movie 1', description: 'Description 1', poster: 'poster1.jpg' },
  { id: 2, title: 'Movie 2', description: 'Description 2', poster: 'poster2.jpg' }
];

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify(mockMovies));
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();  // Replacing jest with vi
});

test.only('renders bookmarked movies', () => {
  render(<Bookmarks />);
  expect(screen.getByText('Movie 1')).toBeInTheDocument();
  expect(screen.getByText('Movie 2')).toBeInTheDocument();
});

test.only('removes a bookmark when the remove button is clicked', () => {
  render(<Bookmarks />);
  const removeButton = screen.getAllByText('Remove Bookmark')[0];
  fireEvent.click(removeButton);
  expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
  expect(localStorage.setItem).toHaveBeenCalled();
});

test.only('shows no bookmarks message when no movies are bookmarked', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify([]));
  render(<Bookmarks />);
  expect(screen.getByText('No bookmarks added yet.')).toBeInTheDocument();
});*/
