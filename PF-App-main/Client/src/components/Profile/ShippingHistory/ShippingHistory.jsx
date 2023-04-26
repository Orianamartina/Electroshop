import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./shippingHistory.scss";

const ShippingHistory = ({ id }) => {
  const [shippingHistory, setShippingHistory] = useState([]);

  const getShippingHistory = async () => {
    try {
      const response = await axios.get(`order/user/${id}`);
      // ordenar response.data por "date" ascendente
      response.data.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      setShippingHistory(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  useEffect(() => {
    getShippingHistory();
  }, []);

  return (
    <div className="history">
      <h2>Historial de Compras</h2>
      <ul>
        {shippingHistory.map((item) => (
          <div key={item.id} className="history-cards">
            <p>{item.date}</p>
            {item.products.map((product) => (
              <Link to={`/detail/${product.id}`} key={product.id}>
                <div>
                  <p>Producto: {product.name}</p>
                  <p>Precio: {product.price}</p>
                  <img src={product.image} alt="" />
                  <p>{product.category}</p>
                  <p>Marca: {product.brand}</p>
                  <p>Monto total: {item.totalPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShippingHistory;
