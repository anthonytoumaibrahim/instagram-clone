// React stuff
import { useState, useRef, useEffect } from "react";

// Components
import Logo from "../../../../components/Logo";
import Input from "../Input";

// Styles
import "./styles.css";

// Phone Apps
import google_play from "../../../../assets/landing/google-play.png";
import microsoft from "../../../../assets/landing/microsoft.png";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authInfo, setAuthInfo] = useState({
    username: "",
    password: "",
  });

  const btnRef = useRef(null);

  const handleAuthInputChange = (type, value) => {
    setAuthInfo({
      ...authInfo,
      [type]: value,
    });
  };

  const handleButtonState = () => {
    if (authInfo.username !== "" && authInfo.password.length >= 8) {
      btnRef.current.disabled = false;
      return;
    }
    btnRef.current.disabled = true;
  };

  useEffect(() => {
    handleButtonState();
  }, [authInfo]);
  return (
    <div className="authentication-container">
      <div className="authentication-card">
        <Logo />

        <form action="" className="authentication-form">
          <Input
            placeholder="Phone number, email or username"
            value={authInfo.username}
            handleChange={(value) => handleAuthInputChange("username", value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={authInfo.password}
            handleChange={(value) => handleAuthInputChange("password", value)}
          />
          <button className="button button-primary" ref={btnRef}>
            Log in
          </button>
        </form>
      </div>
      <div className="authentication-card">
        <p>
          {isLogin ? "Don't have an account?" : "Have an account?"}{" "}
          <button
            className="font-medium link unstyled-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
      <div className="phone-apps-container">
        <p>Get the app.</p>
        <div className="phone-apps">
          <img src={google_play} alt="Google Play" />
          <img src={microsoft} alt="Microsoft Store" />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
