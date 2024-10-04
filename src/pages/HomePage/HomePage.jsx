import { useEffect, useState } from 'react'
<<<<<<< HEAD:src/pages/HomePage/HomePage.jsx
import MovieList from '../../components/Movies/MovieList';
import Header from '../../components/Header/Header';
import movieData from "../../movies.json";
import "../HomePage/HomePage.css";
=======
import MovieList from '../components/Movies/MovieList';
import Header from '../components/Header/Header';
import movieData from "../movies.json";
import "./HomePage.css";
>>>>>>> 2a1ad697b41a479c1af510dfe64c0c793e0a9c3d:src/pages/HomePage.jsx
export default function HomePage() {
 const [movies, setMovies] = useState(movieData);
return (
    <section >
        <Header/>
        <h2>Trending now</h2>
        <MovieList movies= {movies}/>
        
        <h2>Recommended for you</h2>
        <div>
        
        </div>
     
    </section>
  )
}
