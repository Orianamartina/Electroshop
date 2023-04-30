import React, { useEffect } from "react";
import "./relatedProducts.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../redux/actions/actions";
import Product from "../../Product/Product";

const RelatedProducts = ({ category, productId }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const filteredProducts = allProducts.filter((product) => product.category === category && product.id !== productId);

  const randomProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="relatedProducts" id="products">
      <h2>Comprá productos similares</h2>
      <div>
        {randomProducts.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
