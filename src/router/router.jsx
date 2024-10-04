//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import HomePage from '../pages/HomePage/HomePage';
import Movie from "../components/Movie/Movie";
import Categories from "../pages/Categories/Categories";
const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/category", element: <Categories /> },
    { path: "/movie/:title", element: <Movie/> },
   
  ]);
=======


import HomePage from '../pages/HomePage';
import Categories from "../pages/Categories/Categories";
import MovieDetails from "../pages/MovieDetailes/MovieDetailes";
import FilmView from '../pages/FilmView/FilmView'

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/category", element: <Categories /> },
  { path: "/movie-details", element: <MovieDetails /> },
  { path: "/movie/:title", element: <FilmView /> },
]);
>>>>>>> 2a1ad697b41a479c1af510dfe64c0c793e0a9c3d

export default router;
