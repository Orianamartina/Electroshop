import React from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PurchaseOrderButton = ({ products, user }) => {
  const API_URL = process.env.API_URL + "payment";

  const handlePayment = () => {
    axios.post(API_URL, { items: [...products], userId: user }).then((res) => {
      window.location.href = res.data.response.body.init_point;
    });
  };

  return (
    <button className="buyButton" onClick={handlePayment}>
      Continuar compra
    </button>
  );
};

export default PurchaseOrderButton;
