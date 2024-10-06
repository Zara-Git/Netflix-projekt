import { useEffect, useState } from 'react'
import MovieList from '../../components/Movies/MovieList';
import Header from '../../components/Header/Header';
import movieData from "../../movies.json";
import Carousel from '../../components/carousel/carousel';
import "../HomePage/HomePage.css";

export default function HomePage() {
 const [movies, setMovies] = useState(movieData);

const trendingMovies = movies.filter(mov => mov.isTrending);
return (
    <section className='home_page_container'>
        <Header/>
        <h2>Trending now</h2>
        {/* <MovieList movies= {movies}/> */}
        <Carousel movies = {trendingMovies}/>
        <h2>Recommended for you</h2>
        <div>
        
        </div>
     
    </section>
  )
}
