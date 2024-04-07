// React Router
import { Link } from "react-router-dom";

// Logo
import logo_black from "../../assets/logo/logo.png";

const Logo = ({ size = 174, asLink = true }) => {
  const element = (
    <img src={logo_black} alt="Instagram" className="logo" width={size} />
  );

  return asLink ? <Link to="/">{element}</Link> : element;
};

export default Logo;
