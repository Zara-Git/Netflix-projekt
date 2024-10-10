import PropTypes from 'prop-types'; // Import PropTypes
import './GenreMenu.css';

const GenreMenu = ({ genres, onSelectGenre }) => {
  return (
    <div className="genre-menu" aria-label="Genre Menu">
      <ul role="menu">
        {genres.map((genre) => (
          <li key={genre} onClick={() => onSelectGenre(genre)} role="menuitem">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};


// PropTypes for validation
GenreMenu.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectGenre: PropTypes.func.isRequired,
};

export default GenreMenu;
