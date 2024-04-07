// React stuff
import { NavLink, Link } from "react-router-dom";

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
import { PiHouseBold, PiHouseFill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";

// Styles
import "./styles.css";

const Sidebar = () => {
  const avatarSelector = useSelector((state) => state.userSlice.avatar);
  return (
    <aside className="sidebar">
      <Logo size={120} />

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive, isPending, isTransitioning }) =>
            isActive ? (
              <>
                <PiHouseFill size={22} className="nav-icon" />
                Home
              </>
            ) : (
              <>
                <PiHouseBold size={22} className="nav-icon" />
                Home
              </>
            )
          }
        </NavLink>
        <Link to="/search">
          <FiSearch size={22} className="nav-icon" />
          Search
        </Link>
        <Link to="/explore">
          <FaRegCompass size={22} className="nav-icon" />
          Explore
        </Link>
        <Link to="/profile">
          <FaRegSquarePlus size={22} className="nav-icon" />
          Create
        </Link>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive, isPending, isTransitioning }) =>
            isActive ? (
              <>
                <Avatar
                  size={22}
                  avatar_url={avatarSelector}
                  className="nav-icon avatar-active"
                />
                Profile
              </>
            ) : (
              <>
                <Avatar
                  size={22}
                  avatar_url={avatarSelector}
                  className="nav-icon"
                />
                Profile
              </>
            )
          }
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
