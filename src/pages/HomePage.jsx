import { useState } from "react";
import MovieList from "../components/Movies/MovieList";
import Header from "../components/Header/Header";
import movieData from "../movies.json";
import "../pages/HomePage.css";

export default function HomePage() {
  const [movies, setMovies] = useState(movieData);

  return (
    <section>
      <Header />
      <h2>Trending now</h2>
      <MovieList movies={movies} />

      <h2>Recommended for you</h2>
      <div></div>
    </section>
  );
}
