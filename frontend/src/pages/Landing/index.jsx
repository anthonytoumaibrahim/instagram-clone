// Components
import Phones from "./components/Phones";
import Authentication from "./components/Authentication";
import Footer from "./components/Footer";

// Styles
import "./styles.css";

const Landing = () => {

  return (
    <>
      <main className="landing-layout container">
        <Phones />

        <Authentication />
      </main>

      <Footer />
    </>
  );
};

export default Landing;
