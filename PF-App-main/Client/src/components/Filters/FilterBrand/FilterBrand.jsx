import React from "react";
import "./filterBrand.scss";

const FilterBrand = ({ filterState, setFilterState, setCurrentPage, brands }) => {
  const handleBrandChange = (e) => {
    const brandValue = e.target.value;
    setFilterState({
      ...filterState,
      brand: brandValue,
    });
    setCurrentPage(1);
  };

  return (
    <div className="filterBrand">
      <select className="option" value={filterState.brand} onChange={handleBrandChange}>
        <option className="option" value="">
          Seleccione una marca
        </option>
        {brands.map((brand, index) => {
          return (
            <option className="option" key={index} value={brand}>
              {brand}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterBrand;
