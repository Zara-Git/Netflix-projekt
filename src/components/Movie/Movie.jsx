import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import movieData from "../../movies.json";
export default function Movie() {
  const navigate = useNavigate();
    const {title} = useParams();
    const movie = movieData.find((mov)=> mov.title === title);

    if(!movie) return <p>No Movie Found.</p>

    const handleBackToHomePage = () => {
      navigate("/");
    }
  return (
    <>
    <Header/>
      <button className="back-button" onClick={handleBackToHomePage}>
          ← Back to Search
        </button>
    
    <section className="movie_content">
      <div>
      <img className="movie_img" src={movie.thumbnail} alt={movie.title} />
      </div>
     <div className="movie_info">
     <h2 className="movie_title">{movie.title}</h2>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Actors:</strong> {movie.actors.join(", ")}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      
     </div>
     
    </section>
    </>
  )
}
