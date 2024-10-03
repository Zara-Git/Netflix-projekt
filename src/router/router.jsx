//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import FilmView from "../pages/FilmView/FilmView";
import Categories from '../pages/Categories/Categories'
import Movie from "../components/Movie/Movie";


const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/category", element: <Categories /> },
  { path: "/movie-details", element: <MovieDetails /> },
  { path: "/film/:title", element: <Movie /> },
  { path: "/movie/:title", element: <FilmView /> },
  ]);




  export default router;
