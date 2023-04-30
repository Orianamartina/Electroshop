import React, { useState, useCallback } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./adminOptions.scss";
// import dotenv from "dotenv";
// dotenv.config();

const AdminOptions = ({ productDetail }) => {
  const [productEdit, setProductEdit] = useState(productDetail);
  const [show, setShow] = useState(false);

  const API_URL = `products/${productDetail.id}`;

  const navigate = useNavigate();

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProductEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleEditProduct = useCallback(async () => {
    try {
      await axios.put(API_URL, productEdit);
      handleClose();
    } catch (error) {
      throw new Error(error);
    }
  }, [handleClose, productDetail.id, productEdit]);

  const handleDeleteProduct = useCallback(async () => {
    try {
      await axios.delete(API_URL);
      handleClose();
      navigate("/home");
    } catch (error) {
      throw new Error(error);
    }
  }, [handleClose, productDetail.id]);

  return (
    <section className="adminOptions">
      <h2>Opciones de administrador</h2>
      <button className="adminButtons modify" onClick={handleShow}>
        Modificar producto
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modificar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="adminForm">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" id="name" value={productEdit.name} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <input type="number" name="price" id="price" value={productEdit.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input type="number" name="stock" id="stock" value={productEdit.stock} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Imagen</label>
              <input type="text" name="image" id="image" value={productEdit.image} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                name="category"
                id="category"
                value={productEdit.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Marca</label>
              <input type="text" name="brand" id="brand" value={productEdit.brand} onChange={handleInputChange} />
            </div>
            <div className="form-group description">
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                id="description"
                value={productEdit.description}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <button className="adminButtons delete" onClick={handleDeleteProduct}>
            Eliminar producto
          </button>
          <button className="adminButtons edit" onClick={handleEditProduct}>
            Guardar Cambios
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default AdminOptions;
