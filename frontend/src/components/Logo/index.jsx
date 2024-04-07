// React Router
import { Link } from "react-router-dom";

// Logo
import logo_black from "../../assets/logo/logo.png";

const Logo = ({ size = 174, as_link = true }) => {
  const element = (
    <img src={logo_black} alt="Instagram" className="logo" width={size} />
  );

  return as_link ? <Link to="/">{element}</Link> : element;
};

export default Logo;
