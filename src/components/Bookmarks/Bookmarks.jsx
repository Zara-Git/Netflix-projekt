import React, { useEffect, useState } from 'react';
import './Bookmarks.css';
import Header from '../Header/Header'; // Import the existing Header component

export default function Bookmarks() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  // Load bookmarks from localStorage when the component mounts
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  // Remove a bookmark
  const removeBookmark = (movieTitle) => {
    const updatedBookmarks = bookmarkedMovies.filter((movie) => movie.title !== movieTitle);
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmarks-container">
      <Header /> {/* Add the header at the top */}
      <h2>Your Bookmarked Movies</h2>
      {bookmarkedMovies.length > 0 ? (
        <ul className="bookmarks-list">
          {bookmarkedMovies.map((movie, index) => (
            <li key={index} className="bookmark-item">
              <img src={movie.thumbnail} alt={movie.title} className="bookmark-poster" />
              <div className="bookmark-info">
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
                <button
                  onClick={() => removeBookmark(movie.title)}
                  className="remove-bookmark-btn"
                >
                  Remove Bookmark
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks added yet.</p>
      )}
    </div>
  );
}
