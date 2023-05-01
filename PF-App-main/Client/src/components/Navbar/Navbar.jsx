import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "./NavbarButtons/DarkMode/DarkMode";
import ProfileButton from "./NavbarButtons/ProfileButton";
import LogoutButton from "./NavbarButtons/LogoutButton";
import CartButton from "./NavbarButtons/CartButton";
import { ImHeadphones } from "react-icons/im";
import { AiOutlineHome, AiOutlineShopping } from "react-icons/ai";

const CustomNavbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar__logo">
          <Link to="/home">
            <ImHeadphones size={40} />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar__links">
            <li className="nav-item">
              <Link to="/" className="nav-link links home-link">
                <AiOutlineHome size={25} className="me-2 mb-2" />
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link links"
                onClick={handleProductsClick}
              >
                <AiOutlineShopping size={25} className="me-2 mb-2" />
                Productos
              </Link>
            </li>

            <div className="navbar-nav">
              {token ? (
                <div className="token_true">
                  <ProfileButton />
                  <CartButton userId={userId} />
                  <LogoutButton />
                </div>
              ) : (
                <Link to="/login" className="ingresar">
                  Iniciar sesión
                </Link>
              )}
              <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
