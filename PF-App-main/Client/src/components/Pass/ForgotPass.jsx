import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./forgotPass.scss";

const secret = "forgot";

export default function ForgotPass() {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setLoading] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const payload = {
    email: input.email,
    password: input.password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("password/reset", payload);
    toast.info("Revisa tu email para confirmar el cambio");

    setInput({
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const handleCheck = () => {
    if (input.password !== input.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };
  if (id) {
    useEffect(() => {
      navigate("/home");
    }, []);
  }

  return (
    <>
      <ToastContainer />
      <div className="forgot-password">
        <p>
          Ingresa tu email y una nueva contraseña.<br></br> Luego recibiras un
          correo electrónico para confirmar esta acción
        </p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2>Recuperar Contraseña</h2>
          <div className="forgot-password-section">
            <input
              type="text"
              value={input.email}
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="forgot-password-section">
            <input
              type="password"
              value={input.password}
              placeholder="Ingresa una nueva contraseña"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="forgot-password-section">
            <input
              type="password"
              value={input.confirmPassword}
              placeholder="Repite la nueva contraseña"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <Link to="/login">Iniciar Sesión</Link>
          <button type="submit" disabled={handleCheck()}>
            {" "}
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
