import React from "react";
import axios from "axios";

const PurchaseOrderButton = ({ products, user, shippingData, discount }) => {
  const API_URL = "payment";
  console.log(discount, "este es el decuento que llega a PurchaseOrder")

  const handlePayment = () => {
    axios.post(API_URL, { items: [...products], userId: user, discount }).then((res) => {
      localStorage.setItem("shippingData", JSON.stringify(shippingData));
      window.location.href = res.data.response.body.init_point;
    });
  };

  return (
    <button className="buyButton" onClick={handlePayment}>
      Completar compra
    </button>
  );
};

export default PurchaseOrderButton;
