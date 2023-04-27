import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./shippingHistory.scss";

const ShippingHistory = ({ id }) => {
  const [shippingHistory, setShippingHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getShippingHistory = async () => {
    try {
      const response = await axios.get(`order/user/${id}`);
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

  const handleItemClick = (index) => {
    setSelectedItem(index === selectedItem ? null : index);
  };

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
        {shippingHistory.map((item, index) => (
          <li key={item.id} className="history-cards">
            <h5>{formatDate(item.date)}</h5>
            <hr />
            {selectedItem === index ? (
              <div>
                <p>Detalles de la compra:</p>
                <ul>
                  {item.products.map((product) => (
                    <li key={product.id}>
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                      <img src={product.image} alt="Producto" />
                      <p>Cantidad ({product.quantitySold})</p>
                    </li>
                  ))}
                  <p>Total: ${item.totalPrice}</p>
                </ul>
              </div>
            ) : (
              item.products.map((product) => (
                <div key={product.id}>
                  <Link to={`/detail/${product.id}`}>
                    <div className="products-card">
                      <img src={product.image} alt="Producto" />
                      <p>{product.name}</p>
                    </div>
                  </Link>
                </div>
              ))
            )}
            <button onClick={() => handleItemClick(index)}>
              {selectedItem === index ? "Cerrar" : "Detalles"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingHistory;
