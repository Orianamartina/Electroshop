import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { validateResetPassword } from "../../../functions/validate";
import { BeatLoader } from "react-spinners";
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

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    const { errors } = validateResetPassword({ ...input, [name]: value });
    setErrors(errors);
  }
  const payload = {
    email: input.email,
    password: input.password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validar los datos antes de hacer la petición
    if (!isValid) {
      return;
    }

    await axios.post("password/reset", payload);
    toast.info("Revisa tu email para confirmar el cambio");

    setInput({
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
        <h3>
          Ingresa tu email y una nueva contraseña.<br></br> Luego recibiras un
          correo electrónico para confirmar esta acción
        </h3>
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
            {errors.email && <p className="error">{errors.email}</p>}{" "}
          </div>
          <div className="forgot-password-section">
            <input
              type="password"
              value={input.password}
              placeholder="Ingresa una nueva contraseña"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            {errors.password && <p className="error">{errors.password}</p>}{" "}
            {/* Mostrar los errores */}
          </div>
          <div className="forgot-password-section">
            <input
              type="password"
              value={input.confirmPassword}
              placeholder="Repite la nueva contraseña"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}{" "}
            {/* Mostrar los errores */}
          </div>
          <Link to="/login">Iniciar Sesión</Link>
          <button type="submit" disabled={handleCheck()}>
            {" "}
            {isLoading ? (
              <BeatLoader size={7} color={"#fff"} loading={isLoading} />
            ) : (
              "Enviar"
            )}
          </button>
        </form>
      </div>
    </>
  );
}