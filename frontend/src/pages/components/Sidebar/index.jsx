// React stuff
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Logo
import Logo from "../../../components/Logo";

// Components
import Avatar from "../../../components/Avatar";
import CreatePost from "../CreatePost";

// Icons
import {
  FaRegCompass,
  FaCompass,
  FaRegSquarePlus,
  FaPowerOff,
} from "react-icons/fa6";
import { PiHouseBold, PiHouseFill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";

// Styles
import "./styles.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [postModal, showPostModal] = useState(false);

  const logout = () => {
    dispatch({
      type: "userSlice/removeUser",
    });
  };
  return (
    <>
      {postModal && (
        <CreatePost handleClose={() => showPostModal(!postModal)} />
      )}
      <aside className="sidebar">
        <Logo size={120} className="sidebar-logo" />
        <Logo size={32} responsive={true} className="sidebar-responsive-logo" />

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive, isPending, isTransitioning }) =>
              isActive ? (
                <>
                  <PiHouseFill size={22} className="nav-icon" />
                  <span className="nav-label">Home</span>
                </>
              ) : (
                <>
                  <PiHouseBold size={22} className="nav-icon" />
                  <span className="nav-label">Home</span>
                </>
              )
            }
          </NavLink>
          <Link to="/search">
            <FiSearch size={22} className="nav-icon" />
            <span className="nav-label">Search</span>
          </Link>
          <NavLink
            to="/explore"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive, isPending, isTransitioning }) =>
              isActive ? (
                <>
                  <FaCompass size={22} className="nav-icon" />
                  <span className="nav-label">Explore</span>
                </>
              ) : (
                <>
                  <FaRegCompass size={22} className="nav-icon" />
                  <span className="nav-label">Explore</span>
                </>
              )
            }
          </NavLink>
          <Link to="/" onClick={() => showPostModal(!postModal)}>
            <FaRegSquarePlus size={22} className="nav-icon" />
            <span className="nav-label">Create</span>
          </Link>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive, isPending, isTransitioning }) =>
              isActive ? (
                <>
                  <Avatar size={22} className="nav-icon avatar-active" />
                  <span className="nav-label">Profile</span>
                </>
              ) : (
                <>
                  <Avatar size={22} className="nav-icon" />
                  <span className="nav-label">Profile</span>
                </>
              )
            }
          </NavLink>

          <Link to="/" className="logout-link" onClick={logout}>
            <FaPowerOff size={22} className="nav-icon" />
            <span className="nav-label">Log out</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
