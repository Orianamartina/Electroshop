import React from "react";
import axios from "axios";

const PurchaseOrderButton = ({products, user}) => {

  // Local
  //const URL = "http://localhost:3001/payment"
  // Deploy
  const URL = "https://electroshop-production.up.railway.app/payment"

  const handlePayment = () => {
    axios
      .post(URL, { items: [...products], userId: user})
      .then((res) => {
        window.location.href = res.data.response.body.init_point;
      });
  };
  
  return <button className="buyButton" onClick={handlePayment}>Continuar compra</button>;
};

export default PurchaseOrderButton;
