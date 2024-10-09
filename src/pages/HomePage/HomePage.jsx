import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import Header from '../../components/Header/Header';
import movieData from '../../movies.json';
import Carousel from '../../components/carousel/Carousel';
import '../HomePage/HomePage.css';

export default function HomePage() {
  const [randomeMovies, setRandomeMovies] = useState([]);

  const getRandomeMovieObject = () => {
    const randomIndex = movieData.sort(() => Math.random() - 0.5); //genererar en random nummer mellan 0 och 1 för varje element och subtraherar 0.5 från det.
    const randomMov = randomIndex.slice(0, 6); // ge oss 5 slumpmässiga filmer från vår blandade array
    setRandomeMovies(randomMov);
  };

  useEffect(() => {
    getRandomeMovieObject();
  }, []);

  const trendingMovies = movieData.filter((mov) => mov.isTrending);

  return (
    <section className="home_page_container">
      <Header />
      <h2>Trending now</h2>
      <Carousel movies={trendingMovies} />
      <h2>Recommended for you</h2>
      {randomeMovies.length > 0 ? (
        <section className="recommended_movies_container">
          <Carousel movies={randomeMovies} />
        </section>
      ) : (
        <p data-testid="no_movie_text">No recommended movie found</p>
      )}
    </section>
  );
}

//PropTypes for validation
HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      isTrending: PropTypes.bool,
      thumbnail: PropTypes.string.isRequired,
    })
  ),
};

// Default props to avoid missing movies array error if not passed
HomePage.defaultProps = {
  movies: movieData,
};
