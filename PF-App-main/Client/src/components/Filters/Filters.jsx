import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFilters } from "../../redux/actions/actions";
import SearchBar from "./SearchBar/SearchBar";
import Order from "./Order/Order";
import FilterBrand from "./FilterBrand/FilterBrand";
import FilterCategories from "./FilterCategories/FilterCategories";
import { Modal, Button } from "react-bootstrap";
import { BsFilterLeft } from "react-icons/bs";
import "./filters.scss";

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const brands = Array.from(new Set(products?.map((product) => product.brand)));
  const category = Array.from(
    new Set(products?.map((product) => product.category))
  );

  const [filterState, setFilterState] = useState({
    search: "",
    brand: "",
    order: "none",
    category: "",
  });

  const memorizedFilterState = useMemo(() => filterState, [filterState]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    dispatch(allFilters(memorizedFilterState));
  }, [memorizedFilterState, dispatch]);

  return (
    <>
      <button className="button-open-filters" onClick={handleShow}>
        <BsFilterLeft size={25} />
        Filtrar
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Filtrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBar
            filterState={filterState}
            setFilterState={setFilterState}
            setCurrentPage={setCurrentPage}
          />

          <Order
            filterState={filterState}
            setFilterState={setFilterState}
            setCurrentPage={setCurrentPage}
          />

          <FilterBrand
            filterState={filterState}
            setFilterState={setFilterState}
            setCurrentPage={setCurrentPage}
            brands={brands}
          />

          <FilterCategories
            filterState={filterState}
            setFilterState={setFilterState}
            setCurrentPage={setCurrentPage}
            categories={category}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCleanFilters}>
            Limpiar filtros
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Filters;
