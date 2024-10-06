import Navbar from "../Navbar/Navbar";
import Search from '../Search/Search';
import "../Header/Header.css";

export default function Header() {


  return (
    <header className='header'>
        <div className='logo'>
           <a href="#">Webflix</a>
        </div>
        <Search inputStyle ={{width:"800px"}}/>
      <Navbar/>
    </header>
  )
}
