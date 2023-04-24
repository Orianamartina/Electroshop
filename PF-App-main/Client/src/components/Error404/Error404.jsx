import React from "react";
import "./error404.scss";
import { useNavigate } from "react-router-dom";
import error404 from "/assets/img/404.png";

const Error = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <div className="error404">
      <h1>Parece que esta página no existe</h1>
      <img src={error404} alt="" />
      <button onClick={backToHome}>Ir a la página principal</button>
    </div>
  );
};

export default Error;
