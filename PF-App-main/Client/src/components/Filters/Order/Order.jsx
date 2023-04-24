import React from "react";
import "./order.scss";

const Order = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleOrderChange = (e) => {
    const orderValue = e.target.value;
    setFilterState({
      ...filterState,
      order: orderValue,
    });
    setCurrentPage(1);
  };

  return (
    <div className="order">
      <select className="option" value={filterState.order} onChange={handleOrderChange}>
        <option className="option" value="none">Seleccione un orden</option>
        <option className="option" value="menor">Menor precio</option>
        <option className="option" value="mayor">Mayor precio</option>
      </select>
    </div>
  );
};

export default Order;
