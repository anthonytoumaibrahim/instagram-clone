// React stuff
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Logo
import Logo from "../../../components/Logo";

// Components
import Avatar from "../../../components/Avatar";

// Icons
import {
  FaHouse,
  FaMagnifyingGlass,
  FaRegCompass,
  FaRegSquarePlus,
} from "react-icons/fa6";

// Styles
import "./styles.css";

const Sidebar = () => {
  const avatarSelector = useSelector((state) => state.userSlice.avatar);
  return (
    <aside className="sidebar">
      <Logo size={120} />

      <nav className="sidebar-nav">
        <Link to="/" className="active">
          <FaHouse size={22} className="nav-icon" />
          Home
        </Link>
        <Link to="/search">
          <FaMagnifyingGlass size={22} className="nav-icon" />
          Search
        </Link>
        <Link to="/explore">
          <FaRegCompass size={22} className="nav-icon" />
          Explore
        </Link>
        <Link to="/profile">
          <Avatar size={22} avatar_url={avatarSelector} className="nav-icon" />
          Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
