import Slider from "react-slick";
import "../carousel/slick.css";
import "../carousel/slick-theme.css";
import "../carousel/Carousel.css";

export default function Carousel({movies}) {
 let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide:0,
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
    <section className="carousel_container">
      <Slider {...settings}>
        {movies.map((mov, index) => (
          <div key={index} className="carousel_content">
            <img src={mov.thumbnail} alt={mov.title} className="carousel_img" />
            <h3>{mov.title}</h3>
            <p className="genre_info">{mov.genre}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
}
