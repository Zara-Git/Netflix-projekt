//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../pages/HomePage/HomePage';
import Movie from "../components/Movie/Movie";
import Categories from "../pages/Categories/Categories";
const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/category", element: <Categories /> },
    { path: "/movie/:title", element: <Movie/> },
   
  ]);




  export default router;
