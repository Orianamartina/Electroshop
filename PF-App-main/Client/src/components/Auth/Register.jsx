import "./auth.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validateRegisterData } from "../../functions/validate";
import { createUser } from "../../redux/actions/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const { token } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const navigate = useNavigate();

  const [dataRegister, setDataRegister] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...dataRegister };
    delete formData.confirmPassword;
    setLoading(true);
    try {
      await createUser(formData);
      toast.info(
        "Registro exitoso. Por favor, revise su correo para validar su cuenta."
      );
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataRegister({
      ...dataRegister,
      [name]: value,
    });
    const { errors } = validateRegisterData({ ...dataRegister, [name]: value });
    setErrors(errors);
  };

  if (token) {
    useEffect(() => {
      navigate("/home");
    }, []);
  }

  return (
    <div className="authDiv">
      <ToastContainer />
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <input
          type="text"
          name="userName"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          value={dataRegister.userName}
        />

        {dataRegister.userName !== "" && errors.userName ? (
          <p className="error">{errors.userName}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={dataRegister.name}
        />

        {dataRegister.name !== "" && errors.name ? (
          <p className="error">{errors.name}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          onChange={handleChange}
          value={dataRegister.lastName}
        />

        {dataRegister.lastName !== "" && errors.lastName ? (
          <p className="error">{errors.lastName}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={dataRegister.email}
        />
        {dataRegister.email !== "" && errors.email ? (
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
          value={dataRegister.password}
        />
        {dataRegister.password !== "" && errors.password ? (
          <p className="error">{errors.password}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          onChange={handleChange}
          value={dataRegister.confirmPassword}
        />
        {dataRegister.confirmPassword !== "" && errors.confirmPassword ? (
          <p className="error">{errors.confirmPassword}</p>
        ) : (
          <p className="error">
            <br />
          </p>
        )}

        <button className="authButton" type="submit" disabled={isLoading}>
          {isLoading ? (
            <BeatLoader color={"#ffffff"} size={7} />
          ) : (
            "Registrarse"
          )}
        </button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
