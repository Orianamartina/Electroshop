import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../redux/actions/actions";

import darkCartIcon from "/assets/img/cart-dark.png";
import lightCartIcon from "/assets/img/cart-ligth.png";

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
        <img src={darkMode ? darkCartIcon : lightCartIcon} alt={darkMode ? "Light Mode" : "Dark Mode"} />
      </div>
    </Link>
  );
};

export default CartButton;
