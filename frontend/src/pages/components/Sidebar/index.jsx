// React stuff
import { Link } from "react-router-dom";

// Logo
import Logo from "../../../components/Logo";

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
  return (
    <aside className="sidebar">
      <Logo size={120} />

      <nav className="sidebar-nav">
        <Link className="active">
          <FaHouse size={22} />
          Home
        </Link>
        <Link>
          <FaMagnifyingGlass size={22} />
          Search
        </Link>
        <Link>
          <FaRegCompass size={22} />
          Explore
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
