//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";

<<<<<<< HEAD
import HomePage from "../pages/HomePage";
=======
import HomePage from '../pages/HomePage/HomePage';
>>>>>>> 694bdd245b0af4b9d40d8d6a861206446eabe55d
import Categories from "../pages/Categories/Categories";
// import MovieDetails from "../pages/MovieDetailes/MovieDetailes";
import FilmView from "../pages/FilmView/FilmView";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/category", element: <Categories /> },
  // { path: "/movie-details", element: <MovieDetails /> },
  { path: "/movie/:title", element: <FilmView /> },
]);

export default router;
