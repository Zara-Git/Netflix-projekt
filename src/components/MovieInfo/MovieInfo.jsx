import './MovieInfo.css'
import { useNavigate } from 'react-router-dom';

const MovieInfo = ({movie}) => {
const actors = movie.actors.join(', ')
const navigate = useNavigate();   

const handleClick = () => {
    navigate(-1);
};

return(
    <div className="movie_component">
        <div><button className='back_button' onClick={handleClick}>Go back</button></div>

        <div className='movie_card'>
        <div className='img_container'><img className='movie_img' src={movie.thumbnail} alt={movie.title}/></div>
        <div className="title_container"><h1 className="title"> { movie.title}</h1>

        <div className='movie_info'>
        <p className='movie_rating'>{ movie.rating}</p>
        <p>{ movie.year}</p>
        <p>{ movie.genre}</p>
        </div>
        
        <button className="play_button">Play</button>
        <button className="add_button">Bookmark</button>
        <p>{movie.synopsis}</p>
        <p><strong>Actors:</strong> <br/> {actors}</p>
        </div>
        </div>

       
    </div>
)
};

export default MovieInfo;
