import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../Search/Search.css';
import movieData from '../../movies.json';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

export default function Search({ inputStyle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fuse = useMemo(() => {
    return new Fuse(movieData, {
      keys: ['title', 'genre', 'actors'], // nyckelord som Fuse.js ska använda
      includeScore: true,
      threshold: 0.3,
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const result = fuse.search(searchQuery);
      const suggestionResults = result.map((result) => result.item);

      setMovieResults(suggestionResults);

      if (suggestionResults.length === 0) {
        setError('No movie found.');
      }
    } else {
      setMovieResults([]);
      setError('');
    }
  }, [searchQuery, fuse]);

  const navigateToMovie = (movie) => {
    setSearchQuery(movie.title);
    navigate(`/movie/${movie.title}`);
  };

  return (
    <form className="searchMovieForm">
      <input
        className="searchInput"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
        placeholder="Search..."
        style={inputStyle}
      />
      {error && <p className="error">{error}</p>}
      <ul className="suggestion_list">
        {movieResults.map((movie, index) => (
          <li
            key={index}
            className="suggestion_item"
            onClick={() => navigateToMovie(movie)}
          >
            {movie.title}
          </li>
        ))}
      </ul>
    </form>
  );
}

Search.propTypes = {
  inputStyle: PropTypes.object,
};
