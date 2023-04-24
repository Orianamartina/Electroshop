import { useNavigate } from "react-router-dom";
import "./payment.scss";

const Rejected = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-status">
      <h1>Tu pago ha sido rechazado</h1>
      {setTimeout(() => {
        navigate("/home");
      }, 3000)}
    </div>
  );
};

export default Rejected;
