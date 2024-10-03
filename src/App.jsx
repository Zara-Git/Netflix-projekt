import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import Categories from "./pages/Categories/Categories";

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
