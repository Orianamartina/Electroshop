import "./app.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Error404 from "./components/Error404/Error404";
import Accepted from "./components/Payment/PaymentAccepted";
import Rejected from "./components/Payment/Rejected";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import ForgotPass from "./components/Pass/ForgotPass";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="app" id="app">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/accepted" element={<Accepted />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/password/reset" element={<ForgotPass />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
