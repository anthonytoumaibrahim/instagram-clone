// React Router
import { Outlet } from "react-router-dom";

// Components
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

// Styles
import "./styles.css";

const UserLayout = () => {
  return (
    <>
      <main className="user-layout">
        <Sidebar />
        <section className="container">
          <Outlet />
          <Footer />
        </section>
      </main>
    </>
  );
};

export default UserLayout;
