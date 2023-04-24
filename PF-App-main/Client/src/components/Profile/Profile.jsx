import React, { useEffect } from "react";
import "./profile.scss";
import { useState } from "react";
import AddProduct from "./AddProduct/AddProduct";
import ManageUsers from "./ManageUsers/ManageUsers";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { userName, name, lastName, email } = user;
  const { admin } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const [editMode, setEditMode] = useState(false);
  const [showProductModal, setshowProductModal] = useState(false);
  const [showUsersModal, setshowUsersModal] = useState(false);

  const [editedName, setEditedName] = useState(name);
  const [editedLastName, setEditedLastName] = useState(lastName);

  const [isLoading, setLoading] = useState(false);
  // Local
  //const URL = "http://localhost:3001/user/update"
  // Deploy
  const URL = "https://electroshop-production.up.railway.app/user/update"

  const saveChanges = async () => {
    const updatedUserData = {
      email: email,
      name: editedName,
      lastName: editedLastName,
      password: "",
    };
    setLoading(true);
    try {
      await axios.put(URL, updatedUserData);
      setTimeout(() => {
        setEditMode(false);
        setEditedName(editedName);
        setEditedLastName(editedLastName);
        const user = JSON.parse(localStorage.getItem("userData"));
        user.name = editedName;
        user.lastName = editedLastName;
        localStorage.setItem("userData", JSON.stringify(user));
        toast.success("Datos actualizados correctamente");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
      toast.error("Error al actualizar los datos");
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="loading">
          <ClipLoader color={"#4a90e2"} size={50} />
        </div>
      ) : (
        <div className="profile">
          <div className="data">
            <h2>{userName}</h2>
            <h3>Mis datos</h3>
            {editMode ? (
              <>
                <div className="cards">
                  <h4>Nombre de usuario</h4>
                  <input
                    className="input-readOnly"
                    type="text"
                    value={userName}
                    readOnly
                  />
                </div>
                <div className="cards">
                  <h4>E-mail</h4>
                  <input
                    className="input-readOnly"
                    type="text"
                    value={email}
                    readOnly
                  />
                </div>
                <div className="cards">
                  <h4>Nombre</h4>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </div>
                <div className="cards">
                  <h4>Apellido</h4>
                  <input
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="cards">
                  <h4>Nombre de usuario</h4>
                  <p>{userName}</p>
                </div>
                <div className="cards">
                  <h4>E-mail</h4>
                  <p>{email}</p>
                </div>
                <div className="cards">
                  <h4>Nombre</h4>
                  <p>{name}</p>
                </div>
                <div className="cards">
                  <h4>Apellido</h4>
                  <p>{lastName}</p>
                </div>
              </>
            )}
            {editMode ? (
              <div className="hidden-buttons">
                <button onClick={() => saveChanges()} disabled={isLoading}>
                  Guardar
                </button>
                <button onClick={() => setEditMode(false)}>Cancelar</button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)}>Modificar datos</button>
            )}
          </div>
          {admin ? null : (
            <div className="purchases">
              <h2>Historial de compras</h2>
              <h3>
                Aún no has realizado ninguna compra. ¡Visita nuestra tienda y
                compra!
              </h3>
            </div>
          )}

          {admin ? (
            <div className="panel-admin">
              <h2>Panel de Administrador</h2>
              <div className="options-container">
                <button
                  className="optionButton"
                  onClick={() => {
                    setshowProductModal(true);
                  }}
                >
                  Agregar Productos
                </button>
                <button
                  className="optionButton"
                  onClick={() => {
                    setshowUsersModal(true);
                  }}
                >
                  Administrar Usuarios
                </button>
                <button className="optionButton">Enviar Cupones</button>

                {showProductModal && (
                  <div className="option-title">
                    <Modal
                      show={showProductModal}
                      onHide={() => setshowProductModal(false)}
                      size="lg"
                    >
                      <Modal.Header closeButton>
                        <div className="option-title">
                          <Modal.Title>Agregar Producto</Modal.Title>
                        </div>
                      </Modal.Header>
                      <AddProduct />
                    </Modal>
                  </div>
                )}
                {showUsersModal && (
                  <Modal
                    show={showUsersModal}
                    onHide={() => setshowUsersModal(false)}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <div className="option-title">
                        <Modal.Title>Administrar Usuarios</Modal.Title>
                      </div>
                    </Modal.Header>
                    <ManageUsers />
                  </Modal>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Profile;
