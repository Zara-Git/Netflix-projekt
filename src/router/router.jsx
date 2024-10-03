//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import Movie from "../components/Movie/Movie";
import Categories from "../pages/Categories/Categories";
import MovieDetails from "../pages/MovieDetailes/MovieDetailes";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/category", element: <Categories /> },
  { path: "/movie-details", element: <MovieDetails /> },
  { path: "/movie/:title", element: <Movie /> },
]);

export default router;
