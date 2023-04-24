import React from "react";

const SearchBar = ({ filterState, setFilterState, setCurrentPage }) => {
  const handleProductSearch = (e) => {
    setFilterState({
      ...filterState,
      search: e.target.value,
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <section>
        <input type="text" value={filterState.search} className="searchBar-input" placeholder="Buscar producto" onChange={handleProductSearch} />
      </section>
    </div>
  );
};

export default SearchBar;
