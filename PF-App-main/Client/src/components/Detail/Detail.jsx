import "./detail.scss";
import { getProductDetail, getCart } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shipping from "/assets/img/shipping.png";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrderButton from "../PurchaseOrderButton/PurchaseOrderButton";
import error404 from "/assets/img/404.png";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import AdminOptions from "./AdminOptions/AdminOptions";
import Reviews from "./Reviews/Reviews";
import Stars from "./Reviews/Stars";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { id: userId, admin } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const productDetail = useSelector((state) => state.productDetail);

  const API_URL = "cart/add";

  const buyProduct = [
    {
      ...productDetail,
      ShoppingCart_Products: {
        quantity: 1,
      },
    },
  ];

  const backToHome = () => {
    navigate("/home");
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(API_URL, {
        productId: productDetail.id,
        userId,
      });
      dispatch(getCart(userId));
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
        dispatch(getProductDetail(id));
      } catch (error) {
        console.error(error);
      }
    };
    getAverageReviews();
  }, []);

  return (
    <>
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
                <p className="p-shipping">
                  <img src={shipping} alt="shipping" />
                  Envío gratis a todo el país
                </p>
                <p>
                  Stock: <b>{productDetail.stock} unidades</b>
                </p>

                <PurchaseOrderButton products={buyProduct} user={userId} />

                <button className="button-cart" onClick={handleAddToCart}>
                  Agregar al carrito
                </button>

                <p className="p-return">Devolución gratis</p>
                <p className="p-return">Compra protegida</p>
              </div>
              <div className="detail-description">
                <h2>Características del producto</h2>
                <h3>Categoría: {productDetail.category}</h3>
                <h3>Marca: {productDetail.brand}</h3>
                <h4>Descripción</h4>
                <p>{productDetail.description}</p>
                <Reviews productId={productDetail.id} userId={userId} />
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
