import { useEffect, useState } from "react";
import MovieList from "../../components/Movies/MovieList";
import Header from "../../components/Header/Header";
import movieData from "../../movies.json";
import Carousel from "../../components/carousel/carousel";

import "../HomePage/HomePage.css";

export default function HomePage() {
  const [movies, setMovies] = useState(movieData);
  const [randomeMovies, setRandomeMovies] = useState([]);

  const getRandomeMovieObject = () => {
    const randomeIndex = [...movies].sort(() => Math.random() - 0.5); //genererar en random nummer mellan 0 och 1 för varje element och subtraherar 0.5 från det.
    const randomeMov = randomeIndex.slice(0, 6); // ge oss 5 slumpmässiga filmer från vår blandade array
    setRandomeMovies(randomeMov);
  };

  useEffect(() => {
    getRandomeMovieObject();
  }, [movies]);

  const trendingMovies = movies.filter((mov) => mov.isTrending);

  return (
    <section className="home_page_container">
      <Header />
      <h2>Trending now</h2>
      <Carousel movies={trendingMovies} />
      <h2>Recommended for you</h2>
      {randomeMovies.length > 0 ? (
        <section className="recommended_movies_container">
          <MovieList movies={randomeMovies} />
        </section>
       
      ) : (
        <p>No recommended movie found</p>
      )}
    </section>
  );
}
