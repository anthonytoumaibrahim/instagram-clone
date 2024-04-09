// React stuff
import { useEffect, useRef } from "react";

// React Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Styles
import "./styles.css";

// Images
import landing_phones from "../../../../assets/landing/phones.png";
import screenshot_1 from "../../../../assets/landing/screenshot1.png";
import screenshot_2 from "../../../../assets/landing/screenshot2.png";
import screenshot_3 from "../../../../assets/landing/screenshot3.png";
import screenshot_4 from "../../../../assets/landing/screenshot4.png";

const Phones = () => {
  return (
    <div
      className="phones-container"
      style={{ backgroundImage: `url('${landing_phones}')` }}
    >
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        swipeable={false}
        showIndicators={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        animationHandler="fade"
        transitionTime={2000}
      >
        <img
          src={screenshot_1}
          alt="Instagram on Mobile"
          className="screenshot"
        />
        <img
          src={screenshot_2}
          alt="Instagram on Mobile"
          className="screenshot"
        />
        <img
          src={screenshot_3}
          alt="Instagram on Mobile"
          className="screenshot"
        />
        <img
          src={screenshot_4}
          alt="Instagram on Mobile"
          className="screenshot"
        />
      </Carousel>
    </div>
  );
};

export default Phones;
