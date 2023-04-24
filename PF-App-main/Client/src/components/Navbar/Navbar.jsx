import "./navbar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import DarkMode from "./NavbarButtons/DarkMode/DarkMode";
import ProfileButton from "./NavbarButtons/ProfileButton";
import LogoutButton from "./NavbarButtons/LogoutButton";
import CartButton from "./NavbarButtons/CartButton";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const { token, id: userId } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const handleProductsClick = () => {
    const productsRef = document.querySelector(".products");
    productsRef.scrollIntoView();
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to={"/home"} className="navbar__logo">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="navbar__links">
                <Nav.Link as={Link} to="/" className="links">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/home" className="links" onClick={handleProductsClick}>
                  Productos
                </Nav.Link>
                {token ? (
                  <div className="token_true">
                    <ProfileButton darkMode={darkMode} setDarkMode={setDarkMode} />
                    <CartButton darkMode={darkMode} userId={userId} />
                    <LogoutButton />
                    <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
                  </div>
                ) : (
                  <Nav.Link as={Link} to="/login" className="ingresar">
                    Iniciar sesión
                  </Nav.Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section>
        <Outlet />
      </section>
    </>
  );
};

export default NavBar;
