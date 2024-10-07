import "../Navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <a href="#" onClick={()=> navigate("/")}>Home</a>
      <a href="#">Trending</a>
      <a href="#" onClick={()=> navigate("/bookmarks")}>Bookmarks</a>
      <a href="#" onClick={() => navigate("/category")}>Category</a>
      <a href="#">Login</a>
    </nav>
  );
}
