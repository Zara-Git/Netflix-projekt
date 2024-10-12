import { useState, useEffect } from 'react';
import movieData from './movies.json';
import './Categories.css';
import GenreMenu from './GenreMenu';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Categories = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const categorizedMovies = {};

    movieData.forEach((movie) => {
      const genres = movie.genre ? movie.genre.split(', ') : [];

      genres.forEach((genre) => {
        if (!categorizedMovies[genre]) {
          categorizedMovies[genre] = [];
        }
        categorizedMovies[genre].push(movie);
      });
    });

    setMoviesByGenre(categorizedMovies);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    setMenuVisible(false);
  };

  const handleMovieClick = (movie) => {
    console.log('Navigating with movie:', movie);
    navigate('/movie/' + movie.title);
  };

  const genres = Object.keys(moviesByGenre);

  const resetToAllMovies = () => {
    setSelectedGenre(null);
  };

  return (
    <div className="Categories-container">
      <Header />
      <button
        className="menu-button"
        onClick={toggleMenu}
        aria-label="Category Menu"
      >
        &#9776;
      </button>

      {menuVisible && (
        <GenreMenu genres={genres} onSelectGenre={handleGenreSelection} />
      )}

      <div className="main-container">
        <div className="genre-section">
          {selectedGenre && (
            <button onClick={resetToAllMovies} className="reset-button">
              Show All Movies
            </button>
          )}
          <h2>{selectedGenre ? selectedGenre : 'All Movies'}</h2>

          <div className="movies">
            {(selectedGenre ? moviesByGenre[selectedGenre] : movieData).map(
              (movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null;

                      e.target.src = '/path-to-fallback-image.jpg'; // Ensure this path is correct
                    }}
                  />
                  <div className="movie-details">
                    <h3>{movie.title}</h3>

                    <p>{movie.genre}</p>
                  </div>
                </div>
              )
            )}
            {selectedGenre &&
              (!moviesByGenre[selectedGenre] ||
                moviesByGenre[selectedGenre].length === 0) && (
                <p>No movies available for this genre.</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
