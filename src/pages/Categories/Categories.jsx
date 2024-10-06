import { useState, useEffect } from "react";
import movieData from "./movies.json";
import "./Categories.css";
import GenreMenu from "./GenreMenu";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const Categories = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
 
  // Move useEffect to the main level

  const navigate = useNavigate();

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
  
  const handleNavigate = () => {
    navigate("/category");
  };

  // Korrekt namn på funktion och lägga till onClick för att navigera till detaljer
  const handleMovieClick = (movie) => {
    console.log("Navigating with movie:", movie);
    navigate("/movie-details", { state: { movie } });
  };

  const genres = Object.keys(moviesByGenre);

  return (
    <div className="Categories-container">
      <Header />
      <button className="menu-button" onClick={toggleMenu}>
        Categori
      </button>

      {menuVisible && (
        <GenreMenu genres={genres} onSelectGenre={handleGenreSelection} />
      )}

      <div className="genre-section">
        {selectedGenre && <h2>{selectedGenre}</h2>}

        <div className="movies">
          {moviesByGenre[selectedGenre]?.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
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
