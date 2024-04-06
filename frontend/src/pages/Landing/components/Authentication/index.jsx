// React stuff
import { useState } from "react";

// Components
import Logo from "../../../../components/Logo";

// Styles
import "./styles.css";

// Phone Apps
import google_play from "../../../../assets/landing/google-play.png";
import microsoft from "../../../../assets/landing/microsoft.png";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="authentication-container">
      <div className="authentication-card">
        <Logo />

        <form action="" className="authentication-form">
          <input
            type="text"
            className="input-old"
            placeholder="Phone number, username or email"
          />
          <input
            type="password"
            className="input-old"
            placeholder="Password"
          />
          <button className="button button-primary">
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
