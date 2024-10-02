//Här skapar vi en router-konfiguration
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../views/HomePage';
import Movie from "../components/Movie/Movie";
const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/movie/:title", element: <Movie/> },
  ]);




  export default router;
