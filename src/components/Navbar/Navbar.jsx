import "../Navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
export default function Navbar() {
  // const navigate = useNavigate();
  return (
    <nav className="navbar">
      <a href="#">Home</a>
      <a href="#">Popular</a>
      <a href="#">Favorite</a>
      {/* <a href={onclick(() => navigate(""))}>Category</a> */}
      <a href="#">Login</a>
    </nav>
  );
}
