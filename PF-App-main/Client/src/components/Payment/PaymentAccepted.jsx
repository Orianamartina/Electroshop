import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";
import accepted from "/assets/img/accepted.gif";
import "./payment.scss";

const Accepted = () => {
  const API_URL = "cart/";
  const API_PRODUCTS_URL = "products/";

  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cartProducts);

  useEffect(() => {
    const handleAccepted = async () => {
      try {
        // Actualizar stock
        await Promise.all(
          cartProducts.map(async (p) => {
            let productEdit = {
              name: p.name,
              bran: p.brand,
              price: p.price,
              image: p.image,
              description: p.description,
              stock: p.stock - p.ShoppingCart_Products.quantity,
              category: p.category,
              disable: p.disable,
            };
            await axios.put(`${API_PRODUCTS_URL}${p.id}`, productEdit);
          })
        );
        // Vaciar carrito
        await axios.post(`${API_URL}empty/${id}`);

        // Obtener carrito actualizado
        dispatch(getCart(id));

        // Redireccionar a home
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    };

    handleAccepted();
  }, []);

  return (
    <div className="payment-status">
      <h1>Tu compra se ha completado exitosamente</h1>
      <img src={accepted} alt="Gif" />
    </div>
  );
};

export default Accepted;
