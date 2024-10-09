import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import '../Header/Header.css';

export default function Header() {
  // const handleHomeClick = () => {
  //   window.location.href = "/"; // Force refresh för att man får nya recommendations
  // };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">Webflix</a>
      </div>
      <Search inputStyle={{ width: '600px' }} />
      <Navbar />
    </header>
  );
}
