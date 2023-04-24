import React from "react";
import { categories } from "../../../functions/constants";
import './filterCategories.scss'

const FilterCategories = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleBrandChange = (e) => {
    const categoryValue = e.target.value;
    setFilterState({
      ...filterState,
      category: categoryValue,
    });
    setCurrentPage(1);
  };

  return (
    <div className="filterBrand">
      <select className="option" value={filterState.category} onChange={handleBrandChange}>
        <option className="option" value="">Seleccione una categoria</option>
        {categories.map((category, index) => {
          return (
            <option className="option" key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterCategories;
