// Här skapar vi en router-konfiguration
import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import Categories from '../pages/Categories/Categories';
// import MovieDetails from "../pages/MovieDetailes/MovieDetailes";
import FilmView from '../pages/FilmView/FilmView';
import Bookmarks from '../components/Bookmarks/Bookmarks'; // Import the Bookmarks component

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/category', element: <Categories /> },
  // { path: "/movie-details", element: <MovieDetails /> },
  { path: '/movie/:title', element: <FilmView /> },
  { path: '/bookmarks', element: <Bookmarks /> }, // New route for Bookmarks
]);

export default router;
