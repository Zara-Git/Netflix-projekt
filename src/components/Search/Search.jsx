import { useState } from "react";
import "../Search/Search.css";
import movieData from "../../movies.json";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

export default function Search({ inputStyle }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fuse = new Fuse(movieData, {
    keys: ["title", "genre", "actors"],
    includeScore: true,
    threshold: 0.3,
  });

  const handleSearch = (e) => {
    const userInput = e.target.value;
    setSearchQuery(userInput);

    if (userInput.trim()) {
      const result = fuse.search(userInput);
      const suggestionResults = result.map((result) => result.item);
      setMovieResults(suggestionResults);
      setError("No result found");
    } else {
      setMovieResults([]);
      setError("");
    }
  };

  const navigateToMovie = (movie) => {
    setSearchQuery(movie.title);
    navigate("/movie-details/", { state: { movie } });
  };

  return (
    <form className="searchMovieForm">
      <input
        className="searchInput"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        required
        placeholder="Search..."
        style={inputStyle}
      />

      <ul className="suggestion_list">
        {movieResults.map((movie, index) => (
          <li key={index} className="suggestion_item" onClick={() => navigateToMovie(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
