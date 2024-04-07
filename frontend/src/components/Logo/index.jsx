// React Router
import { Link } from "react-router-dom";

// Logo
import logo_black from "../../assets/logo/logo.png";
import glyph from "../../assets/logo/glyph.svg";

const Logo = ({
  size = 174,
  as_link = true,
  className,
  responsive = false,
}) => {
  const element = (
    <img
      src={responsive ? glyph : logo_black}
      alt="Instagram"
      className={`logo ${className}`}
      width={size}
    />
  );

  return as_link ? <Link to="/">{element}</Link> : element;
};

export default Logo;
