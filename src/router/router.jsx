//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import FilmView from "../pages/FilmView/FilmView";
import Categories from '../pages/Categories/Categories'


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
  ]);




  export default router;
