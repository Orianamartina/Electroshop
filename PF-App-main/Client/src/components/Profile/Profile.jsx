import React, { useState } from "react";
import "./profile.scss";
import UserData from "./UserData/UserData";
import ShippingHistory from "./ShippingHistory/ShippingHistory";
import AddProduct from "./AddProduct/AddProduct";
import ManageUsers from "./ManageUsers/ManageUsers";
import Favorites from "./Favorites/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { admin } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("userData");

  const closeSideBar = () => {
    setSidebarOpen(false);
  };

  const handleOptionClick = (option) => {
    setCurrentComponent(option);
    setSidebarOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="profile">
        {currentComponent === "userData" && <UserData />}
        {currentComponent === "shippingHistory" && (
          <ShippingHistory id={user.id} />
        )}
        {currentComponent === "addProduct" && <AddProduct />}
        {currentComponent === "manageUsers" && <ManageUsers />}
        {currentComponent === "favorites" && <Favorites />}
      </div>
      <button
        className="button-sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        SideBar
      </button>

      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-content">
          <button onClick={() => handleOptionClick("userData")}>
            Mi Perfil
          </button>
        </div>
        <div className="sidebar-content">
          <button onClick={() => handleOptionClick("shippingHistory")}>
            Mis Compras
          </button>
        </div>
        <div className="sidebar-content">
          <button onClick={() => handleOptionClick("favorites")}>
            Favoritos
          </button>
        </div>

        {admin ? (
          <>
            <div className="sidebar-content">
              <button onClick={() => handleOptionClick("addProduct")}>
                Agregar Producto
              </button>
            </div>
            <div className="sidebar-content">
              <button onClick={() => handleOptionClick("manageUsers")}>
                Administrar Usuarios
              </button>
            </div>
            <div className="sidebar-content">
              <button onClick={() => handleOptionClick("")}>
                Enviar Cupones
              </button>
            </div>
          </>
        ) : null}
        <div className="sidebar-content">
          <button onClick={closeSideBar}>Cerrar</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
