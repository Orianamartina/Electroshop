import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import rejected from "/assets/img/rejected.gif";
import "./payment.scss";

const Rejected = () => {
  const navigate = useNavigate();
  const shippingData = JSON.parse(localStorage.getItem("shippingData"));

  useEffect(() => {
    if (!shippingData) navigate("/home");

    const handleReject = async () => {
      {
        setTimeout(() => {
          navigate("/home");
          localStorage.removeItem("shippingData");
        }, 3000);
      }
    };
    handleReject();
  }, []);

  return (
    <div className="payment-status">
      <h1>Tu pago ha sido rechazado</h1>
      <img src={rejected} alt="Gif" />
    </div>
  );
};

export default Rejected;
