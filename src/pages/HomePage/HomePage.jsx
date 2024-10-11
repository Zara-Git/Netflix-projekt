import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import Header from '../../components/Header/Header';
import movieData from '../../movies.json';
import Carousel from '../../components/carousel/Carousel';
import '../HomePage/HomePage.css';

export default function HomePage() {
  const [randomeMovies, setRandomeMovies] = useState([]);

  const getRandomeMovieObject = () => {

    const trendingMovies = movieData.filter((mov) => mov.isTrending);
    
    const availableMoviesForRecommendation = movieData.filter(
      (mov) => !mov.isTrending
    );

    const randomIndex = availableMoviesForRecommendation.sort(() => Math.random() - 0.5);
    
    const randomMov = randomIndex.slice(0, 6);
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

HomePage.defaultProps = {
  movies: movieData,
};
