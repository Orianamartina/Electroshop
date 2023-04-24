import { useNavigate } from "react-router-dom";
import background_img from "/assets/img/bg-landing.jpg";
import "./landing.scss";

const Landing = () => {
  const navigate = useNavigate();

  const { token, id: userId } =
    JSON.parse(localStorage.getItem("userData")) ?? {};

  const handleExploreClick = () => {
    navigate("/home");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing">
      <img className="background-img" src={background_img} alt="fondo" />
      <aside>
        <h1 className="title">ElectroShop</h1>
        <div>
          <p className="subtitle">
            Bienvenido a nuestra tienda de productos electrónicos
          </p>
          <p className="desc">
            Aquí encontrarás los mejores productos al mejor precio
          </p>
        </div>
        <button className="button-landing" onClick={handleExploreClick}>
          Explorar productos
        </button>
        {token ? null : (
          <button className="button-landing" onClick={handleLogin}>
            Iniciar sesión
          </button>
        )}
      </aside>
    </div>
  );
};

export default Landing;
