import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../Movies/MovieList.css';

export default function MovieList({ movies }) {
  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem('bookmarkedMovies');
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  const toggleBookmark = (movie) => {
    const isBookmarked = bookmarks.some((bm) => bm.title === movie.title);

    if (!isBookmarked) {
      const updatedBookmarks = [...bookmarks, movie];
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        'bookmarkedMovies',
        JSON.stringify(updatedBookmarks)
      );
      console.log('Bookmark added for', movie.title);
    } else {
      const updatedBookmarks = bookmarks.filter(
        (bm) => bm.title !== movie.title
      );
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        'bookmarkedMovies',
        JSON.stringify(updatedBookmarks)
      );
      console.log('Bookmark removed for', movie.title);
    }
  };

  useEffect(() => {
    console.log('Bookmarks updated:', bookmarks);
  }, [bookmarks]);

  return (
    <section className="movie_List_container">
      {movies.length ? (
        movies.map((movie, index) => (
          <section
            className="movie_card"
            key={index}
            style={{ marginBottom: '20px', position: 'relative' }}
          >
            <img
              src={movie.thumbnail}
              alt={movie.title}
              style={{ width: '100%', height: '400px', borderRadius: '10px' }}
            />
            <button
              className="bookmark-button"
              onClick={() => toggleBookmark(movie)}
            >
              {bookmarks.some((bm) => bm.title === movie.title)
                ? 'Remove from Bookmarks'
                : 'Bookmark'}
            </button>
          </section>
        ))
      ) : (
        <p>No movie found</p>
      )}
    </section>
  );
}

// Add PropTypes for validation
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
};
