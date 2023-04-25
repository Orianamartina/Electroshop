import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { loginUser } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { DotLoader } from "react-spinners";

function log() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientID =
    "301297638298-q7q0crhrkrbfmdt75ci4uvhvmfo8h66q.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSuccess = (response) => {
    setLoading(true);
    setUser(response.profileObj);
    const loginData = {
      name: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      userName: response.profileObj.name,
      email: response.profileObj.email,
      verified: true,
      admin: false,
      image: response.profileObj.imageUrl
    };
    const startSession = () => {
      try {
        dispatch(loginUser(loginData, "google"));
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    };
    document.getElementsByClassName("btn").hidden = true;
    startSession();
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const onFailure = () => {
    console.log("Something went wrong");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="loginAuth0">
      <GoogleLogin
        clientId={clientID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        disabled={isLoading}
      >
        {isLoading ? (
          <DotLoader className="loading" color={"#4a90e2"} size={7} />
        ) : (
          "Google"
        )}
      </GoogleLogin>
    </div>
  );
}

export default log;
