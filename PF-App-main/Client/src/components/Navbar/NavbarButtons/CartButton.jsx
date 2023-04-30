import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../redux/actions/actions";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = ({ darkMode, userId }) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cartDetail.totalQuantity);

  useEffect(() => {
    dispatch(getCart(userId));
  }, []);

  return (
    <Link to="/cart" className="perfil">
      <div className="cart">
        {totalQuantity}
        <AiOutlineShoppingCart size={25} className="me-2 mb-1" />
        Carrito
      </div>
    </Link>
  );
};

export default CartButton;
