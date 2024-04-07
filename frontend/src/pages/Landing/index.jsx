// Components
import Phones from "./components/Phones";
import Authentication from "./components/Authentication";
import Footer from "./components/Footer";

// Styles
import "./styles.css";

const Landing = () => {

  return (
    <main className="landing-page">
      <section className="landing-layout container">
        <Phones />

        <Authentication />
      </section>

      <Footer />
    </main>
  );
};

export default Landing;
