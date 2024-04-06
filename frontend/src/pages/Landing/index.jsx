// Components
import Authentication from "./components/Authentication";
import Footer from "./components/Footer";

// Styles
import "./styles.css";

// Images
import landing_phones from "../../assets/landing/phones.png";
import screenshot_1 from "../../assets/landing/screenshot1.png";
import screenshot_2 from "../../assets/landing/screenshot2.png";
import screenshot_3 from "../../assets/landing/screenshot3.png";
import screenshot_4 from "../../assets/landing/screenshot4.png";

const Landing = () => {
  return (
    <>
      <main className="landing-layout container">
        <div
          className="phones-container"
          style={{ backgroundImage: `url('${landing_phones}')` }}
        >
          <img
            src={screenshot_1}
            alt="Instagram on Mobile"
            className="screenshot"
          />
          {/* <img src={screenshot_2} alt="Instagram on Mobile" />
          <img src={screenshot_3} alt="Instagram on Mobile" />
          <img src={screenshot_4} alt="Instagram on Mobile" /> */}
        </div>

        <Authentication />
      </main>

      <Footer />
    </>
  );
};

export default Landing;
