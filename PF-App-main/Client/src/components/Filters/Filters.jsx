import "./filters.scss";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFilters } from "../../redux/actions/actions";
import SearchBar from "./SearchBar/SearchBar";
import Order from "./Order/Order";
import FilterBrand from "./FilterBrand/FilterBrand";
import FilterCategories from "./FilterCategories/FilterCategories";

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const brands = Array.from(new Set(products?.map((product) => product.brand)));
  const category = Array.from(new Set(products?.map((product) => product.category)));

  const [filterState, setFilterState] = useState({
    search: "",
    brand: "",
    order: "none",
    category: "",
  });

  const memoizedFilterState = useMemo(() => filterState, [filterState]);

  const handleCleanFilters = () => {
    setFilterState({
      search: "",
      brand: "",
      order: "none",
      category: "",
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(allFilters(memoizedFilterState));
  }, [memoizedFilterState, dispatch]);

  return (
    <div className="filters">
      <h4>Buscar producto</h4>
      <SearchBar filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />

      <h4>Ordenar</h4>
      <Order filterState={filterState} setFilterState={setFilterState} setCurrentPage={setCurrentPage} />

      <h4>Marca:</h4>
      <FilterBrand
        filterState={filterState}
        setFilterState={setFilterState}
        setCurrentPage={setCurrentPage}
        brands={brands}
      />

      <h4>Categoría:</h4>
      <FilterCategories
        filterState={filterState}
        setFilterState={setFilterState}
        setCurrentPage={setCurrentPage}
        categories={category}
      />

      <button className="button cleanFilters" onClick={handleCleanFilters}>
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filters;
