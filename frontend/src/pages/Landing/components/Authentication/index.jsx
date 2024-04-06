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
    emailOrPhone: "",
    fullName: "",
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
    if (!isLogin) {
      if (authInfo) {
      }
    }
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
          {isLogin ? (
            <Input
              placeholder="Phone number, email or username"
              value={authInfo.username}
              handleChange={(value) => handleAuthInputChange("username", value)}
            />
          ) : (
            <>
              <Input
                placeholder="Mobile Number or Email"
                value={authInfo.emailOrPhone}
                handleChange={(value) =>
                  handleAuthInputChange("emailOrPhone", value)
                }
              />
              <Input
                placeholder="Full Name"
                value={authInfo.fullName}
                handleChange={(value) =>
                  handleAuthInputChange("fullName", value)
                }
              />
              <Input
                placeholder="Username"
                value={authInfo.username}
                handleChange={(value) =>
                  handleAuthInputChange("username", value)
                }
              />
            </>
          )}

          <Input
            type="password"
            placeholder="Password"
            value={authInfo.password}
            handleChange={(value) => handleAuthInputChange("password", value)}
          />
          {!isLogin && (
            <div className="tos-info">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <a href="#!" className="link link-dark" target="_blank">
                  Learn More
                </a>
              </p>
              <p>
                By signing up, you agree to our{" "}
                <a href="#!" className="link link-dark" target="_blank">
                  Terms
                </a>
                ,{" "}
                <a href="#!" className="link link-dark" target="_blank">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#!" className="link link-dark" target="_blank">
                  Cookies Policy
                </a>
                .
              </p>
            </div>
          )}
          <button className="button button-primary" ref={btnRef}>
            {isLogin ? "Log in" : "Sign up"}
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
