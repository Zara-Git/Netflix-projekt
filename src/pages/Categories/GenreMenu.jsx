import React from "react";
import "./GenreMenu.css";

const GenreMenu = ({ genres, onSelectGenre }) => {
  return (
    <div className="genre-menu">
      <ul>
        {genres.map((genre) => (
          <li key={genre} onClick={() => onSelectGenre(genre)}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreMenu;
