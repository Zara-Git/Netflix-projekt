import { useLocation, useNavigate } from "react-router-dom";
import "./MovieDetailes.css"; // Importera CSS-filen

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Kontrollera om state eller movie finns
  if (!location.state || !location.state.movie) {
    return (
      <div className="movie-details-container">
        <h2>No Movie Found</h2>
        <p>Sorry, we couldnot find the movie details you were looking for.</p>
        <button onClick={() => navigate("/category")}>
          Go back to Categories
        </button>
      </div>
    );
  }

  // Hämta filmen från state om den finns
  const { movie } = location.state;

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <img
          className="movie-thumbnail"
          src={movie.thumbnail}
          alt={movie.title}
        />
        <div className="movie-info">
          <h2>
            {movie.title} ({movie.year})
          </h2>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Actors:</strong> {movie.actors.join(", ")}
          </p>
          <p>
            <strong>Synopsis:</strong> {movie.synopsis}
          </p>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/category")}>
        Go back to Categories
      </button>
    </div>
  );
};

export default MovieDetails;
