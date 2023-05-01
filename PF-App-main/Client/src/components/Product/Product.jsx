import "./product.scss";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  function handleDetail() {
    navigate(`/detail/${product.id}`);
  }

  return (
    <a className="product" onClick={handleDetail}>
      <img src={product.image} alt={product.name} />
      <section className="info">
        <p className="pName">{product.name}</p>
        <p className="pBrand">
          {product.category} - {product.brand}
        </p>
        <p className="pPrice">$ {product.price.toLocaleString()}</p>
        <hr />
      </section>
    </a>
  );
};

export default Product;
