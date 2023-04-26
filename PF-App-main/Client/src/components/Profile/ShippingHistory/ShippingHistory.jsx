import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./shippingHistory.scss";

const ShippingHistory = ({ id }) => {
  const [shippingHistory, setShippingHistory] = useState([]);
  const navigate = useNavigate();

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

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate() + 1;
    const monthName = dateObj.toLocaleString("es", { month: "long" });
    const year = dateObj.getFullYear();
    return `${day} de ${monthName} de ${year}`;
  };

  return (
    <div className="history">
      <h2>Historial de Compras</h2>
      <ul>
        {shippingHistory.map((item) => (
          <li key={item.id} className="history-cards">
            <h5>{formatDate(item.date)}</h5>
            <hr />
            {item.products.map((product) => (
              <Link to={`/detail/${product.id}`} key={product.id}>
                <div className="products-card">
                  <img src={product.image} alt="Producto" />
                  <p>{product.name}</p>
                </div>
              </Link>
            ))}
            <button>Ver Compra</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingHistory;
