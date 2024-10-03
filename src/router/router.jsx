//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import FilmView from "../pages/FilmView/FilmView";


const router = createBrowserRouter([
    { 
      path: "/", 
      element: <HomePage /> 
    },
    // { path: "/movie/:title", element: <Movie/> },

    {
      path: '/movie/:title',
      element: <FilmView />
    },
  ]);




  export default router;
