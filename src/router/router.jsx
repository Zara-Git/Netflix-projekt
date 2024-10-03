//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import FilmView from "../pages/FilmView/FilmView";
import Categories from '../pages/Categories/Categories'
import Movie from "../components/Movie/Movie";


const router = createBrowserRouter([
    { 
      path: "/", 
      element: <HomePage /> 
    },
    {
      path: '/movie/:title',
      element: <FilmView />
    },
    {
      path: '/category',
      element: <Categories />
    },
    { path: "/film/:title", element: <Movie /> },
  ]);




  export default router;
