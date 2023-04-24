import React from "react";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("userData");
      window.location.reload();
    }, 500);
  };
  return (
    <Link onClick={handleLogout} to="/home" className="desconectarse">
      Cerrar sesión
    </Link>
  );
};

export default LogoutButton;