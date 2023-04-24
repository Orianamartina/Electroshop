import { Link } from "react-router-dom";
import darkProfileIcon from "/assets/img/profile-dark.png";
import lightProfileIcon from "/assets/img/profile-ligth.png";

const ProfileButton = ({ darkMode }) => {
  return (
    <Link to="/profile">
      <img src={darkMode ? darkProfileIcon : lightProfileIcon} alt={darkMode ? "Light Mode" : "Dark Mode"} />
    </Link>
  );
};

export default ProfileButton;
