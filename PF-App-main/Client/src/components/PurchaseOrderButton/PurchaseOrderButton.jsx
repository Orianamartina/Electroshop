import React from "react";
import axios from "axios";

const PurchaseOrderButton = ({ products, user, shippingData }) => {
  const API_URL = "payment";

  const { userId, street, number, postCode, apartment, floor, city, state, country } = shippingData;

  const handleOrder = () => {
    axios.post("order/create/", { userId, street, number, postCode, apartment, floor, city, state, country });
  };

  const handlePayment = () => {
    handleOrder();
    axios.post(API_URL, { items: [...products], userId: user }).then((res) => {
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
