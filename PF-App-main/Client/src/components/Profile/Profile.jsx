import React from "react";
import "./profile.scss";
import { useState } from "react";
import AddProduct from "./AddProduct/AddProduct";
import ManageUsers from "./ManageUsers/ManageUsers";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
// import dotenv from "dotenv";
// dotenv.config();

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { userName, name, lastName, email, image } = user;
  const { admin } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const [editMode, setEditMode] = useState(false);
  const [showProductModal, setshowProductModal] = useState(false);
  const [showUsersModal, setshowUsersModal] = useState(false);

  const [editedName, setEditedName] = useState(name);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedImage, setEditedImage] = useState(image);

  const [isLoading, setLoading] = useState(false);

  const API_URL = "user/update";

  // Cloudinary
  var uploadedImage = "";
  const uploadImage = (e) => {
    const data = new FormData();

    data.append("file", e.target.files[0]);
    data.append("upload_preset", "uq7hpsv9");

    axios
      .post("https://api.cloudinary.com/v1_1/dlzp43wz9/image/upload", data)
      .then((response) => {
        uploadedImage = response.data.secure_url;
        setEditedImage(uploadedImage);
      });
  };

  const saveChanges = async () => {
    const updatedUserData = {
      email: email,
      name: editedName,
      lastName: editedLastName,
      password: "",
      image: editedImage,
    };
    setLoading(true);
    try {
      await axios.put(API_URL, updatedUserData);
      setTimeout(() => {
        setEditMode(false);
        setEditedName(editedName);
        setEditedLastName(editedLastName);
        setEditedImage(editedImage);
        const user = JSON.parse(localStorage.getItem("userData"));
        user.name = editedName;
        user.lastName = editedLastName;
        user.image = editedImage;
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
          {/* Datos del usuario */}
          {/* Imagen y nombre */}
          <div className="data">
            <div className="data-img-text">
              <div className="data-img">
                <img src={image} width="90px" alt="" />
              </div>
              <div className="data-text">
                <h2>{userName}</h2>
              </div>
            </div>
            {editMode ? (
              <>
                {/* Cards data */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Nombre de usuario</h4>
                  </div>
                  <div className="cards-inputField">
                    <input
                      className="input-readOnly"
                      type="text"
                      value={userName}
                      readOnly
                    />
                  </div>
                </div>
                {/* Cards data */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>E-mail</h4>
                  </div>
                  <div className="cards-inputField">
                    <input
                      className="input-readOnly"
                      type="text"
                      value={email}
                      readOnly
                    />
                  </div>
                </div>
                {/* Cards data */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Nombre</h4>
                  </div>
                  <div className="cards-inputField">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Cards data */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Apellido</h4>
                  </div>
                  <div className="cards-inputField">
                    <input
                      type="text"
                      value={editedLastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                    />
                  </div>
                </div>
                {/* Cards data */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Foto de Perfil</h4>
                  </div>
                  <div className="cards-inputField">
                    <input
                      type="file"
                      value={uploadedImage}
                      onChange={uploadImage}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Cards modificables */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Nombre de usuario</h4>
                  </div>
                  <div className="cards-inputField">
                    <p>{userName}</p>
                  </div>
                </div>
                {/* Cards modificables */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>E-mail</h4>
                  </div>
                  <div className="cards-inputField">
                    <p>{email}</p>
                  </div>
                </div>
                {/* Cards modificables */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Nombre</h4>
                  </div>
                  <div className="cards-inputField">
                    <p>{name}</p>
                  </div>
                </div>
                {/* Cards modificables */}
                <div className="cards">
                  <div className="cards-textField">
                    <h4>Apellido</h4>
                  </div>
                  <div className="cards-inputField">
                    <p>{lastName}</p>
                  </div>
                </div>
              </>
            )}
            {/* Botones modificar datos */}
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
          {/* Historial de compras */}
          {admin ? null : (
            <div className="purchases">
              <h2>Historial de compras</h2>
              <h3>
                Aún no has realizado ninguna compra. ¡Visita nuestra tienda y
                compra!
              </h3>
            </div>
          )}
          {/* Botones de administrador */}
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
