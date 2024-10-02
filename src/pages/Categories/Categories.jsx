import React, { useState, useEffect } from "react";
import movieData from "./movies.json";
import "./Categories.css";
import GenreMenu from "./GenreMenu";

const Categories = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Move useEffect to the main level
  useEffect(() => {
    const categorizedMovies = {};

    // Loop through each movie in the movieData array
    movieData.forEach((movie) => {
      const genres = movie.genre.split(", "); // Split the genre string into an array

      // Loop through each genre
      genres.forEach((genre) => {
        if (!categorizedMovies[genre]) {
          categorizedMovies[genre] = [];
        }
        categorizedMovies[genre].push(movie);
      });
    });

    // Update the state with the categorized movies
    setMoviesByGenre(categorizedMovies);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    setMenuVisible(false);
  };

  const genres = Object.keys(moviesByGenre);

  return (
    <div className="Categories-container">
      <button className="menu-button" onClick={toggleMenu}>
        Categori
      </button>

      {/* Render the GenreMenu component if menuVisible is true */}
      {menuVisible && (
        <GenreMenu genres={genres} onSelectGenre={setSelectedGenre} />
      )}

      <div className="genre-section">
        {selectedGenre && <h2>{selectedGenre}</h2>}

        <div className="movies">
          {moviesByGenre[selectedGenre]?.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.thumbnail} alt={movie.title} />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
