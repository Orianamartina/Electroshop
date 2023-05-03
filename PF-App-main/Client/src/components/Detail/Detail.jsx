// Paquetes
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

// Componentes
import AdminOptions from "./AdminOptions/AdminOptions";
import Reviews from "./Reviews/Reviews";
import Stars from "./Reviews/Stars";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Favorite from "./Favorite/Favorite";

// Acciones
import { getProductDetail, getCart } from "../../redux/actions/actions";

// Imágenes
import shipping from "/assets/img/shipping.png";
import error404 from "/assets/img/404.png";

// Estilos
import "./detail.scss";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import ShareProduct from "./ShareProduct/ShareProduct";
import { RxReset } from "react-icons/rx";
import { BsShieldCheck } from "react-icons/bs";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    id: userId,
    admin,
    token,
  } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const productDetail = useSelector((state) => state.productDetail);

  const API_URL = "cart/add";

  const backToHome = () => {
    navigate("/home");
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(API_URL, {
        productId: productDetail.id,
        userId,
      });
      if (response.data === "Product added") {
        toast.success("Producto agregado al carrito");
        dispatch(getCart(userId));
      } else {
        toast.error("No hay unidades disponibles");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getProductDetail(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const [averageReviews, setAverageReviews] = useState(0);

  useEffect(() => {
    const getAverageReviews = async () => {
      try {
        const response = await axios.get(`review/average/${id}`);
        setAverageReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAverageReviews();
  }, [id]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="loading">
          <ClipLoader color="#4a90e2" size={50} />
        </div>
      ) : (
        <div className="detail-container">
          {productDetail?.id ? (
            <>
              <div className="detail-image">
                <button onClick={backToHome}>Volver</button>
                <img src={productDetail.image} alt={productDetail.name} />
              </div>
              <div className="detail-info">
                <h3>{productDetail.name}</h3>
                <Stars rating={averageReviews} editable={false} />
                <h2>$ {productDetail.price.toLocaleString()}</h2>{" "}
              </div>
              <div className="detail-buy">
                <div className="shipping-favorite">
                  <p className="p-shipping">
                    <img src={shipping} alt="shipping" />
                    Envío gratis a todo el país
                  </p>
                  {token && (
                    <div className="p-favorite">
                      <Favorite userId={userId} productId={productDetail.id} />
                    </div>
                  )}
                </div>
                <p>
                  Stock:{" "}
                  <b>
                    {productDetail.stock < 0
                      ? "0 unidades"
                      : productDetail.stock === 1
                      ? "1 unidad"
                      : `${productDetail.stock} unidades`}
                  </b>
                </p>

                {token ? (
                  <button className="button-cart" onClick={handleAddToCart}>
                    Agregar al carrito
                  </button>
                ) : (
                  <button className="button-cart">
                    <Link to="/login">Agregar al carrito</Link>
                  </button>
                )}
                <div className="return-protected">
                  <BsShieldCheck />
                  <p>Compra protegida</p>
                </div>
                <div className="return-protected">
                  <RxReset />
                  <p>Devolución gratis</p>
                </div>

                <ShareProduct
                  id={productDetail.id}
                  name={productDetail.name}
                  image={productDetail.image}
                />
              </div>
              <div className="detail-description">
                <h2>Características del producto</h2>
                <div className="detail-description__div">
                  <h3>Categoría: </h3>
                  <p>{productDetail.category}</p>
                </div>
                <div className="detail-description__div">
                  <h3>Marca: </h3>
                  <p className="brand-detail">{productDetail.brand}</p>
                </div>
                <h4>Descripción</h4>
                <p>{productDetail.description}</p>
                <RelatedProducts
                  category={productDetail.category}
                  productId={productDetail.id}
                />
                <Reviews
                  productId={productDetail.id}
                  userId={userId}
                  token={token}
                />
              </div>
              {admin && <AdminOptions productDetail={productDetail} />}
            </>
          ) : (
            <div className="product404">
              <h1>Parece que esta página no existe</h1>
              <img src={error404} alt="error404" />
              <button onClick={backToHome}>Volver</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Detail;
