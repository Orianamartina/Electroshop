import React, { useState } from "react";
import "./profile.scss";
import UserData from "./UserData/UserData";
import ShippingHistory from "./ShippingHistory/ShippingHistory";
import AddProduct from "./AddProduct/AddProduct";
import ManageUsers from "./ManageUsers/ManageUsers";
import Favorites from "./Favorites/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RxCross1,
  RxHamburgerMenu,
  RxHeart,
  RxFileText,
  RxArchive,
} from "react-icons/rx";
import { AiOutlineShopping } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

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
        className="button-open-sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        onMouseEnter={() => setSidebarOpen(!sidebarOpen)}
      >
        <RxHamburgerMenu size={30} />
      </button>

      <div
        className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="close-side-bar">
          <button onClick={closeSideBar}>
            {" "}
            <RxCross1 size={20} />
          </button>
        </div>
        <div className="sidebar-content">
          <button onClick={() => handleOptionClick("userData")}>
            <FaRegUser size={20} className="side-bar-icon" />
            Mi Perfil
          </button>
        </div>
        <div className="sidebar-content">
          <button onClick={() => handleOptionClick("shippingHistory")}>
            <AiOutlineShopping size={20} className="side-bar-icon" />
            Mis Compras
          </button>
        </div>
        <div className="sidebar-content">
          <button onClick={() => handleOptionClick("favorites")}>
            <RxHeart size={20} className="side-bar-icon" />
            Favoritos
          </button>
        </div>

        {admin ? (
          <>
            <div className="sidebar-content">
              <button onClick={() => handleOptionClick("addProduct")}>
                <RxArchive size={20} className="side-bar-icon" />
                Agregar Producto
              </button>
            </div>
            <div className="sidebar-content">
              <button onClick={() => handleOptionClick("manageUsers")}>
                <HiOutlineUsers size={20} className="side-bar-icon" />
                Administrar Usuarios
              </button>
            </div>
            <div className="sidebar-content">
              <button onClick={() => handleOptionClick("")}>
                <RxFileText size={20} className="side-bar-icon" />
                Enviar Cupones
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
