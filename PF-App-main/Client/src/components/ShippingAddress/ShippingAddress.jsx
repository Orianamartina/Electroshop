import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./shippingAddress.scss";
import PurchaseOrderButton from "../PurchaseOrderButton/PurchaseOrderButton";

const ShippingAddress = () => {
  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const cartProducts = useSelector((state) => state.cartProducts.sort((a, b) => a.id - b.id));

  const [shippingData, setShippingData] = useState({
    userId: id,
    street: "",
    number: "",
    postCode: "",
    apartment: "",
    floor: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  return (
    <div className="shipping">
      <h2>Datos de Envío</h2>
      <form>
        <div className="form-group">
          <label htmlFor="street">Calle:</label>
          <input type="text" id="street" name="street" value={shippingData.street} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="number">Número:</label>
          <input type="number" id="number" name="number" value={shippingData.number} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="postCode">Código Postal:</label>
          <input type="number" id="postCode" name="postCode" value={shippingData.postCode} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="apartment">Departamento:</label>
          <input type="text" id="apartment" name="apartment" value={shippingData.apartment} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="floor">Piso:</label>
          <input type="number" id="floor" name="floor" value={shippingData.floor} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad:</label>
          <input type="text" id="city" name="city" value={shippingData.city} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado/Provincia:</label>
          <input type="text" id="state" name="state" value={shippingData.state} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="country">País:</label>
          <input type="text" id="country" name="country" value={shippingData.country} onChange={handleChange} />
        </div>
      </form>
      <PurchaseOrderButton products={cartProducts} user={id} shippingData={shippingData} />
    </div>
  );
};

export default ShippingAddress;
