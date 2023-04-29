import React from "react";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./billing.scss";

const Billing = () => {
  const [orders, setOrders] = useState([]);
  const [usersList, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getOrders = async () => {
    try {
      const response = await axios.get(`order/`);
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const showAllUsers = async () => {
    try {
      const response = await dispatch(getAllUsers());
      const users = response.payload;
      setUsers(users);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate() + 1;
    const monthName = dateObj.toLocaleString("es", { month: "long" });
    const year = dateObj.getFullYear();
    return `${day} de ${monthName} de ${year}`;
  };

  useEffect(() => {
    getOrders();
    showAllUsers();
  }, []);

  return (
    <div className="billing">
      <h2>Facturación</h2>
      {orders.map((order) => {
        const user = usersList.find((user) => user.id === order.userId);
        return (
          <div key={order.id} className="billing-cards">
            <h5>{formatDate(order.date)}</h5>
            <hr />
            <h4>
              {user.name} {user.lastName}
            </h4>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.cellphone}</p>
            <hr />
            <div className="billing-detail">
              {order.products.map((product) => (
                <div key={product.id}>
                  <div className="billing-name">
                    <img src={product.image} alt="Producto" />
                    <h4>{product.name}</h4>
                    <p>Cantidad: {product.quantitySold}</p>
                    <hr />
                  </div>
                </div>
              ))}
              <h4>Total: {order.totalPrice}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Billing;
