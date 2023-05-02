import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./userData.scss";
import { useNavigate } from "react-router-dom";

const UserData = () => {
  const navigate = useNavigate();
  const { userName, name, lastName, email, image, cellphone, token } =
    JSON.parse(localStorage.getItem("userData")) ?? {};

  if (!token) {
    useEffect(() => {
      navigate("/home");
    }, []);
  }

  //Para modificar datos del perfil
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedImage, setEditedImage] = useState(image);
  const [editedCellphone, setEditedCellphone] = useState(cellphone);
  const [editedPassword, setEditedPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Cloudinary
  var uploadedImage = "";
  const uploadImage = (e) => {
    const data = new FormData();

    data.append("file", e.target.files[0]);
    data.append("upload_preset", "uq7hpsv9");

    axios.post("https://api.cloudinary.com/v1_1/dlzp43wz9/image/upload", data).then((response) => {
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
      cellphone: editedCellphone,
      password: editedPassword,
    };
    setLoading(true);
    try {
      await axios.put("user/update", updatedUserData);
      setTimeout(() => {
        setEditMode(false);
        setEditedName(editedName);
        setEditedLastName(editedLastName);
        setEditedImage(editedImage);
        setEditedCellphone(editedCellphone);
        setEditedPassword(editedPassword);
        const user = JSON.parse(localStorage.getItem("userData"));
        user.name = editedName;
        user.lastName = editedLastName;
        user.image = editedImage;
        user.cellphone = editedCellphone;
        user.password = editedPassword;
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
      {isLoading ? (
        <div className="loading">
          <ClipLoader color={"#4a90e2"} size={50} />
        </div>
      ) : (
        <div className="data">
          {/* Imagen y nombre */}
          <div className="data-img-text">
            <div className="data-img">
              <img src={image} width="90px" alt="" />
            </div>
            <div className="data-text">
              <h2>{userName}</h2>
              {/* Boton cambiar foto de perfil */}
              {editMode ? (
                <div>
                  <label htmlFor="uploadInput">
                    Cambiar foto de perfil
                    <input id="uploadInput" type="file" onChange={uploadImage} style={{ display: "none" }} />
                  </label>
                </div>
              ) : null}
            </div>
          </div>
          {editMode ? (
            <>
              {/* Modo edicion */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Nombre de usuario</h4>
                </div>
                <div className="cards-inputField">
                  <input className="input-readOnly" type="text" value={userName} readOnly />
                </div>
              </div>
              {/* Modo edicion */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>E-mail</h4>
                </div>
                <div className="cards-inputField">
                  <input className="input-readOnly" type="text" value={email} readOnly />
                </div>
              </div>
              {/* Modo edicion */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Nombre</h4>
                </div>
                <div className="cards-inputField">
                  <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                </div>
              </div>
              {/* Modo edicion */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Apellido</h4>
                </div>
                <div className="cards-inputField">
                  <input type="text" value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} />
                </div>
              </div>
              {/* Modo edicion */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Teléfono</h4>
                </div>
                <div className="cards-inputField">
                  <input type="text" value={editedCellphone} onChange={(e) => setEditedCellphone(e.target.value)} />
                </div>
              </div>
              {/* Modo edicion */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Contraseña</h4>
                </div>
                <div className="cards-inputField">
                  <input type="password" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Modo fijo */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Nombre de usuario</h4>
                </div>
                <div className="cards-inputField">
                  <p>{userName}</p>
                </div>
              </div>
              {/* Modo fijo */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>E-mail</h4>
                </div>
                <div className="cards-inputField">
                  <p>{email}</p>
                </div>
              </div>
              {/* Modo fijo */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Nombre</h4>
                </div>
                <div className="cards-inputField">
                  <p>{name}</p>
                </div>
              </div>
              {/* Modo fijo */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Apellido</h4>
                </div>
                <div className="cards-inputField">
                  <p>{lastName}</p>
                </div>
              </div>
              {/* Modo fijo */}
              <div className="cards">
                <div className="cards-textField">
                  <h4>Teléfono</h4>
                </div>
                <div className="cards-inputField">
                  <p>{cellphone}</p>
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
      )}
    </>
  );
};

export default UserData;
