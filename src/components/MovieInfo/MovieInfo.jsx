import './MovieInfo.css'

const MovieInfo = ({movie}) => {
const actors = movie.actors.join(', ')

return(
    <div className="movie_component">

        <div className='movie_card'>
        <div className='img_container'><img className='movie_img' src={movie.thumbnail} alt="" /></div>
        <div className="title_container"><h1 className="title"> { movie.title}</h1>

        <div className='movie_info'>
        <p className='movie_rating'>{ movie.rating}</p>
        <p>{ movie.year}</p>
        <p>{ movie.genre}</p>
        </div>
        
        <button className="play-button">Play</button>
        <button className="add-button">Bokmärk</button>
        <p>{movie.synopsis}</p>
        <p><strong>Actors:</strong> <br/> {actors}</p>
        </div>
        </div>

       
    </div>
)
};

export default MovieInfo;
