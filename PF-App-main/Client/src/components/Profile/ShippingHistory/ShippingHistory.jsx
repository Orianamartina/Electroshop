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
          <li key={item.id} className="shipping-cards">
            <h5>{formatDate(item.date)}</h5>
            <hr />
            {selectedItem === index ? (
              <div className="shipping-detail">
                <div>
                  {item.products.map((product) => (
                    <div key={product.id}>
                      <div className="shipping-name">
                        <img src={product.image} alt="Producto" />
                        <h4>{product.name}</h4>
                      </div>
                      <hr />
                      <div className="shipping-price">
                        <p>
                          Precio unitario: $ {product.price.toLocaleString()}
                        </p>
                        <p>Cantidad: {product.quantitySold}</p>
                        <hr />
                      </div>
                    </div>
                  ))}
                  <h3 className="total-price">
                    Total de la compra: $ {item.totalPrice.toLocaleString()}
                  </h3>
                </div>
                <div className="shipping-adress">
                  <div className="shipping-adress-title">
                    <h5>Detalles del envío</h5>
                  </div>
                  <div className="shipping-adress-text">
                    <p>
                      Dirección: {item.shippingAddress.street}{" "}
                      {item.shippingAddress.number}
                    </p>
                    <p>Departamento: {item.shippingAddress.floor}</p>
                    <p>Ciudad: {item.shippingAddress.city}</p>
                    <p> Código postal : {item.shippingAddress.postCode}</p>
                    <p>Provincia: {item.shippingAddress.state}</p>
                    <p>País: {item.shippingAddress.country}</p>
                  </div>
                </div>
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
            <button className="button-close" onClick={() => handleItemClick(index)}>
              {selectedItem === index ? "Cerrar" : "Detalles"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingHistory;
