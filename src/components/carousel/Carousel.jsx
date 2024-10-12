import Slider from 'react-slick';
import PropTypes from 'prop-types'; // Importing PropTypes
import '../carousel/slick.css';
import '../carousel/slick-theme.css';
import '../carousel/Carousel.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Carousel({ movies }) {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  const isBookmarked = (movieTitle) => {
    return bookmarkedMovies.some((bookmark) => bookmark.title === movieTitle);
  };

  const toggleBookmark = (movie) => {
    let updatedBookmarks;
    if (isBookmarked(movie.title)) {
      updatedBookmarks = bookmarkedMovies.filter(
        (bookmark) => bookmark.title !== movie.title
      );
    } else {
      updatedBookmarks = [...bookmarkedMovies, movie];
    }
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="carousel_container" data-testid="carousel">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="carousel_content">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="carousel_img"
              onClick={() => navigate('/movie/' + movie.title)}
            />
            <h3>{movie.title}</h3>
            <p className="genre_info">{movie.genre}</p>
            <button
            
              className="bookmark_button"
              onClick={() => toggleBookmark(movie)}
            > <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
              {isBookmarked(movie.title)
                ? 'Remove Bookmark'
                : 'Add to Bookmark'}
            </button>
          </div>
        ))}
      </Slider>
    </section>
  );
}

//PropTypes for validation
Carousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })
  ).isRequired, // Validate that 'movies' is an array of objects with the specified shape
};
