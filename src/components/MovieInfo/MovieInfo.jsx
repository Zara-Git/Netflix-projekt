import PropTypes from 'prop-types';
import './MovieInfo.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MovieInfo = ({ movie }) => {
  const actors = movie.actors.join(', ');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  const isBookmarked = (movieTitle) => {
    return bookmarkedMovies.some((bookmark) => bookmark.title === movieTitle);
  };

  const toggleBookmark = (movie) => {
    let updatedBookmarks;
    if (isBookmarked(movie.title)) {
      updatedBookmarks = bookmarkedMovies.filter(
        (bookmark) => bookmark.title !== movie.title
      );
    } else {
      updatedBookmarks = [...bookmarkedMovies, movie];
    }
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="movie_component">
      <div>
        <button className="back_button" onClick={handleClick}>
          Go back
        </button>
      </div>

      <div className="movie_card">
        <div className="img_container">
          <img className="movie_img" src={movie.thumbnail} alt={movie.title} />
        </div>
        <div className="title_container">
          <h1 className="title"> {movie.title}</h1>

          <div className="movie_info">
            <p className="movie_rating">{movie.rating}</p>
            <p>{movie.year}</p>
            <p>{movie.genre}</p>
          </div>

          <button className="play_button">Play</button>
          <button className="add_button" onClick={() => toggleBookmark(movie)}>
            {isBookmarked(movie.title) ? 'Remove Bookmark' : 'Add to Bookmark'}
          </button>
          <p>{movie.synopsis}</p>
          <p>
            <strong>Actors:</strong> <br /> {actors}
          </p>
        </div>
      </div>
    </div>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.number,
    genre: PropTypes.string,
    synopsis: PropTypes.string,
  }).isRequired,
};

export default MovieInfo;
