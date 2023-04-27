import "./auth.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { validateLoginData } from "../../functions/validate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import Log from "./Auth0/Log";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await dispatch(loginUser(dataLogin, "log"));
      if (user === undefined) {
        toast.error("El usuario no coincide con los datos ingresados");
      } else {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (error.message === "Error en la petición") {
      } else {
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
    const { errors } = validateLoginData({ ...dataLogin, [name]: value });
    setErrors(errors);
  };
  if(id){
    useEffect(() => {
        navigate("/home");;
    },[])
  }
  return (
    <>
      <ToastContainer />
      <div className="authDiv">
        <form className="authForm authFormLogin" onSubmit={handleSubmit}>
          <h1>Iniciar sesion</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={dataLogin.email}
          />
          {dataLogin.email !== "" && errors.email ? (
            <p className="error">{errors.email}</p>
          ) : (
            <p className="error">
              <br />
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={dataLogin.password}
          />
          {dataLogin.password !== "" && errors.password ? (
            <p className="error">{errors.password}</p>
          ) : (
            <p className="error">
              <br />
            </p>
          )}
          <button className="authButton" type="submit" disabled={isLoading}>
            {isLoading ? <BeatLoader color={"#ffffff"} size={7} /> : "Ingresar"}
          </button>
          <p>
            ¿No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
          <p>
            <Link to="/password/reset">¿Olvidaste tu contraseña? </Link> 
          </p>
          <p className="pAuth"> O ingresa con: </p>
          <Log />
        </form>
      </div>
    </>
  );
};

export default Login;
