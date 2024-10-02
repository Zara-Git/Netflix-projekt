import { useState } from "react";
import "../Search/Search.css";
import movieData from "../../movies.json";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [suggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
const navigate = useNavigate();

const handleChangeInput = (e) => {
    const userInput = e.target.value;
    setSearch(userInput);
    setError("");
    
    if (!userInput.trim()) {
      
      setSearchResult([]);
      setError("Please insert a Movie To Search");
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }
   
    

    const filteredResult = movieData
      .filter((input) => {
        return (
          input.title.toLowerCase().includes(search.toLowerCase()) ||
          input.genre.toLowerCase().includes(search.toLowerCase()) ||
          input.actors.join(" ").toLowerCase().includes(search.toLowerCase())
        );
      })
      .slice(0, 5);
    if (filteredResult.length === 0) {
      setError("No Movie found.");
    } else {
      setError("");
    }

  setSearchSuggestions(filteredResult);
  setShowSuggestions(true);
  };
 
const handleSuggestionsResult = (suggestion) => {
setSearch(suggestion.title);
setSearchResult([suggestion]);
setShowSuggestions(false);
setError("");
navigate(`/movie/${suggestion.title}`)
}
  

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
           {suggestions.map((movie, index)=>(
            <li key={index} className="suggestion_item" onClick={()=> handleSuggestionsResult(movie)}>
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
