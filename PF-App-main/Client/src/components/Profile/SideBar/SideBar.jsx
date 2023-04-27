import React from "react";
import "./sideBar.scss";
import { Modal } from "react-bootstrap";
import AddProduct from "../AddProduct/AddProduct";
import ManageUsers from "../ManageUsers/ManageUsers";


const SideBar = () => {
  return (
    <div className="sideBar">
      {/* {admin ? (
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
      ) : null} */}
    </div>
  );
};

export default SideBar;
