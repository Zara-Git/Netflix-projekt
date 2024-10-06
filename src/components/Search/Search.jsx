import { useState } from "react";
import "../Search/Search.css";
import movieData from "../../movies.json";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

export default function Search({inputStyle}) {
  const [searchQuary, setSearchQuary] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fuse = new Fuse(movieData, {
    keys: ["title", "genre", "actors"], // nyckelord som Fuse.js ska använda
    includeScore: true,
    threshold: 0.3,
  });

  const handleSerach = (e) => {
    const userInput = e.target.value;
    setSearchQuary(userInput);

    if (userInput.trim() ) {
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
    setSearchQuary(movie.title);
    navigate("/movie-details/", { state: { movie } });
  };

  return (
    <form className="searchMovieForm">
      <input
        className="serachInput"
        type="text"
        value={searchQuary}
        onChange={handleSerach}
        required
        placeholder="Search..."
        style={inputStyle}
      />
      
      <ul className="suggestion_list">
        {movieResults.map((movie, index) => (
          <li key={index} className="suggestion_item" onClick={() =>navigateToMovie(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
