import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Bookmarks from './Bookmarks';

describe('Bookmarks component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  //test.only
  test.only('renders "No bookmarks added yet" when there are no bookmarks', () => {
    render(
      <BrowserRouter>
        <Bookmarks />
      </BrowserRouter>
    );

    expect(screen.getByText('No bookmarks added yet.')).toBeInTheDocument();
  });
  //test.only
  test.only('renders bookmarks when they are available', () => {
    const mockBookmarks = [
      { title: 'Movie 1', genre: 'Action', thumbnail: 'thumbnail1.jpg' },
      { title: 'Movie 2', genre: 'Comedy', thumbnail: 'thumbnail2.jpg' },
    ];

    localStorage.setItem('bookmarkedMovies', JSON.stringify(mockBookmarks));

    render(
      <BrowserRouter>
        <Bookmarks />
      </BrowserRouter>
    );

    expect(screen.getByText('Your Bookmarked Movies')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });
  //test.only
  test.only('removes a bookmark when remove button is clicked', () => {
    const mockBookmarks = [
      { title: 'Movie 1', genre: 'Action', thumbnail: 'thumbnail1.jpg' },
      { title: 'Movie 2', genre: 'Comedy', thumbnail: 'thumbnail2.jpg' },
    ];

    localStorage.setItem('bookmarkedMovies', JSON.stringify(mockBookmarks));

    render(
      <BrowserRouter>
        <Bookmarks />
      </BrowserRouter>
    );

    const removeButton = screen.getAllByText('Remove Bookmark')[0];
    fireEvent.click(removeButton);

    expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
  });
});
