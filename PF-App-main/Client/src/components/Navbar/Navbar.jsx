import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import DarkMode from "./NavbarButtons/DarkMode/DarkMode";
import ProfileButton from "./NavbarButtons/ProfileButton";
import LogoutButton from "./NavbarButtons/LogoutButton";
import CartButton from "./NavbarButtons/CartButton";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const { token, id: userId } =
    JSON.parse(localStorage.getItem("userData")) ?? {};

  const handleProductsClick = () => {
    const productsRef = document.querySelector(".products");
    productsRef.scrollIntoView();
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar__links">
        <Link to="/" className="links">
          Inicio
        </Link>
        <Link to="/home" className="links" onClick={handleProductsClick}>
          Productos
        </Link>
        {token ? (
          <div className="token_true">
            <ProfileButton darkMode={darkMode} setDarkMode={setDarkMode} />
            <CartButton darkMode={darkMode} userId={userId} />
            <LogoutButton />
          </div>
        ) : (
          <Link to="/login" className="ingresar">
            Iniciar sesión
          </Link>
        )}
        <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default Navbar;
