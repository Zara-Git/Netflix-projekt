import { useEffect, useState } from 'react';
import './Bookmarks.css';
import Header from '../Header/Header'; //existing Header component
import { useNavigate } from 'react-router-dom';

export default function Bookmarks() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  // Remove bookmarkS
  const removeBookmark = (movieTitle) => {
    const updatedBookmarks = bookmarkedMovies.filter(
      (movie) => movie.title !== movieTitle
    );
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmarks-container">
      <Header />
      <h2>Your Bookmarked Movies</h2>
      {bookmarkedMovies.length > 0 ? (
        <ul className="bookmarks-list">
          {bookmarkedMovies.map((movie, index) => (
            <li key={index} className="bookmark-item">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="bookmark-poster"
                onClick={() => navigate('/movie/' + movie.title)}
              />
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
