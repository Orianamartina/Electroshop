import "./carrousel.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsCarrousel from "./carrouselProducts.json";

const Carrousel = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const navigate = useNavigate();

  const handleDetail = () => {
    const product = productsCarrousel[currentProductIndex];
    navigate(`/detail/${product.id}`);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentProductIndex - 1 + productsCarrousel.length) %
      productsCarrousel.length;
    setCurrentProductIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentProductIndex + 1) % productsCarrousel.length;
    setCurrentProductIndex(nextIndex);
  };

  const currentProduct = productsCarrousel[currentProductIndex];

  return (
    <div className="carrousel">
      <img
        src={currentProduct.image}
        alt={currentProduct.name}
      />
      <section>
        <h3>{currentProduct.name}</h3>
        <button className="button" onClick={handleDetail}>
          Ver detalles
        </button>
      </section>

      <button className="scrollCarrousel" onClick={handlePrev}>
        &lt;
      </button>
      <button className="scrollCarrousel" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carrousel;
