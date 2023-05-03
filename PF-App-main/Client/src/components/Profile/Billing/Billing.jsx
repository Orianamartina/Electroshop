import React from "react";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./billing.scss";

const Billing = () => {
  //Datos de la orden y usuarios
  const [orders, setOrders] = useState([]);
  const [usersList, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOptionDate, setSortOptionDate] = useState("dateAsc");
  const [sortOptionPrice, setSortOptionPrice] = useState("totalPriceAsc");

  const dispatch = useDispatch();

  //Filtros

  const getOrders = async () => {
    try {
      const response = await axios.get(`order/`);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSortOptionPrice("totalPriceAsc");
    setSortOptionDate("dateAsc");
  };

  const handleSortOptionDateChange = (event) => {
    setSortOptionDate(event.target.value);
  };

  const handleSortOptionPriceChange = (event) => {
    setSortOptionPrice(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const user = usersList.find((user) => user.id === order.userId);
    if (searchTerm === "") {
      return order;
    } else if (
      user &&
      (user.name
        .toLowerCase()
        .concat(" ", user.lastName.toLowerCase())
        .includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        formatDate(order.date).toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return order;
    }
  });

  let sortedOrders = filteredOrders.sort((a, b) => {
    let result;
    switch (sortOptionDate) {
      case "dateAsc":
        result = new Date(b.date) - new Date(a.date);
        break;
      case "dateDesc":
        result = new Date(a.date) - new Date(b.date);
        break;
      default:
        result = 0;
        break;
    }
    return result;
  });

  switch (sortOptionPrice) {
    case "totalPriceDesc":
      sortedOrders = sortedOrders.reverse();
      break;
    case "totalPriceAsc":
      break;
    default:
      break;
  }

  return (
    <div className="billing">
      <h2>Facturación</h2>
      <div className="billing-filters">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={sortOptionDate} onChange={handleSortOptionDateChange}>
          <option value="dateAsc">Más recientes</option>
          <option value="dateDesc">Menos recientes</option>
        </select>
        <select value={sortOptionPrice} onChange={handleSortOptionPriceChange}>
          <option value="totalPriceAsc">Mayor precio</option>
          <option value="totalPriceDesc">Menor precio</option>
        </select>
        <button onClick={handleClearSearch}>Limpiar</button>
      </div>
      {filteredOrders.map((order) => {
        if (!order.products.length) {
          return null;
        }
        const user = usersList.find((user) => user.id === order.userId);
        return (
          <div key={order.id} className="billing-cards">
            <div className="billing-date">
              <h3>{formatDate(order.date)}</h3>
            </div>
            <hr />
            <div className="billing-user">
              {user ? (
                <div>
                  <h4>
                    <b>
                      {user.name} {user.lastName}
                    </b>
                  </h4>
                  <p>{user.email}</p>
                  <p>
                    <b>Usuario:</b> {user.userName}
                  </p>
                  <p>Teléfono: {user.cellphone}</p>
                </div>
              ) : (
                <div>
                  <h4>
                    <b>Usuario eliminado</b>
                  </h4>
                </div>
              )}
            </div>
            <hr />
            <div className="billing-detail">
              {order.products.map((product) => (
                <div key={product.id}>
                  <Link to={`/detail/${product.id}`}>
                    <img src={product.image} alt="Producto" />
                  </Link>
                  <h4>{product.name}</h4>
                  <p>
                    <b>Cantidad:</b> {product.quantitySold}
                  </p>
                  <hr />
                </div>
              ))}
              <div className="billing-total">
                <h3>Total: ${order.totalPrice.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Billing;
