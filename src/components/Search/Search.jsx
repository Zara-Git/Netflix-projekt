import { useState } from "react";
import "../Search/Search.css";
import movieData from "../../movies.json";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
export default function Search() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [suggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Konfigurera Fuse.js med relevanta sökfält
  const fuse = new Fuse(movieData, {
    keys: ["title", "genre", "actors"], // Sökfält som Fuse.js ska använda
    includeScore: true, // Inkludera score för att ranka sökresultaten
    threshold: 0.3, // Justera känsligheten för sökning (lägre värde = striktare sökning)
  });

  const handleChangeInput = (e) => {
   const userInput = e.target.value;
   if (!userInput.trim()) {
    setSearchResult([0]);
    setError("Please insert a Movie To Search");
    setSearchSuggestions([]);
    setShowSuggestions(false);
    return;
  }
    setSearch(userInput);
    setError("");
    handleSearch(userInput);
  };

  //   const handleSearch= (text) => {
  //     const fuse = new Fuse( movieData, {
  //       keys:  ["title", "genre", "actors"],
  //     setSearch(text);
  //     setSearchSuggestions(fuse.search(text).slice(0, 5));
  //   }
  // };

  const handleSearch = (movie) => {
    setSearch(movie); // här Uppdaterar vi våran söktext i state variabeln

    if (!userInput.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const suggestionResults = fuse.search(userInput).slice(0, 5); // räknar med de första fem siffrorna

    //om inga resultat hittas
    if (suggestionResults.length === 0) {
      setError("No Movie found.");
      setSearchSuggestions([]);
    } else {
      setError(""); // Rensa felmeddelande om resultat finns
    }
    setSearchSuggestions(suggestionResults.map((result) => result.item)); // här uppdaterar vi sökförslagen baserat på fuse resultatet
    setShowSuggestions(true);
  };

  // const filteredResult = fuse.search(userInput).map((result)=> result.item)movieData
  //   .filter((input) => {
  //     return (
  //       input.title.toLowerCase().includes(search.toLowerCase()) ||
  //       input.genre.toLowerCase().includes(search.toLowerCase()) ||
  //       input.actors.join(" ").toLowerCase().includes(search.toLowerCase())
  //     );
  //   })
  //   .slice(0, 5);
  // if (suggestionResults.length === 0) {
  //   setError("No Movie found.");
  // } else {
  //   setError("");
  // }

  // setSearchSuggestions(suggestionResults );
  // setShowSuggestions(true);
  // };

  const handleSuggestionsResult = (suggestion) => {
    setSearch(suggestion.title);
    setSearchResult([suggestion]);
    setShowSuggestions(false);
    setError("");
    navigate(`/movie/${suggestion.title}`);
  };

  return (
    <div className="searchMovieForm">
      <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={search}
        onChange={handleChangeInput}
        className="searchText"
        required
      />

      {error && <p className="error">{error}</p>}

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestion_list">
          {suggestions.map((movie, index) => (
            <li
              key={index}
              className="suggestion_item"
              onClick={() => handleSuggestionsResult(movie)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
      <div className="results">
        {searchResult.length > 0
          ? searchResult.map((mov, index) => (
              <article key={index} className="movie_result">
                <h3>{mov.title}</h3>
              </article>
            ))
          : error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
