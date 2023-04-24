import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./discountCodeInput.scss";
import { BeatLoader } from "react-spinners";

import axios from "axios";

import discountIcon from "/assets/img/discount.png";

function DiscountCodeInput({ userId, handleCart }) {
  const [string, setString] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [errorDiscount, setErrorDiscount] = useState(false);
  
  // Local
  //const URL = "http://localhost:3001/cart/desc"
  
  // Depeloy
  const URL = "https://electroshop-production.up.railway.app/cart/desc"

  function handleInputChange(e) {
    setString(e.target.value);
  }

  const applyDiscountCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorDiscount(false);
    try {
      if (!string) {
        setLoading(false);
        return;
      }
      const response = await axios.post(URL, {
        string,
        userId,
      });
      if (response.status === 200) {
        setTimeout(() => {
          handleCart();
          handleClose();
          setString("");
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setErrorDiscount(true);
      }, 1000);
      throw new Error(error);
    }
  };

  function handleClose() {
    setShowModal(false);
    setString("");
    setErrorDiscount(false);
  }

  function handleOpen() {
    setShowModal(true);
  }

  return (
    <>
      <button className="discount-button" onClick={handleOpen}>
        <img src={discountIcon} alt="" />
        <p>Ingresar código de cupón</p>
      </button>
      <Modal show={showModal} onHide={handleClose} size="s" className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Ingresa tu código de descuento:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            id="discount-code-input"
            value={string}
            onChange={handleInputChange}
            className="discount-code-input"
          />
          {errorDiscount && <p className="error-discount">Código de descuento inválido</p>}
        </Modal.Body>
        <Modal.Footer>
          <button className="applyDiscount" type="submit" onClick={applyDiscountCode} disabled={isLoading}>
            {isLoading ? <BeatLoader color={"#fcfcfc"} size={7} /> : "Aplicar descuento"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiscountCodeInput;
