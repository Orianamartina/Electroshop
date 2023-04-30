import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const ProfileButton = () => {
  return (
    <Link to="/profile" className="profile-logo">
      <FaRegUser size={20} className="me-2 mb-1" />
      Mi Cuenta
    </Link>
  );
};

export default ProfileButton;
