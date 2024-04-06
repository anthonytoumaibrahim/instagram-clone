// React stuff
import { useEffect, useRef } from "react";

// Styles
import "./styles.css";

// Images
import landing_phones from "../../../../assets/landing/phones.png";
import screenshot_1 from "../../../../assets/landing/screenshot1.png";
import screenshot_2 from "../../../../assets/landing/screenshot2.png";
import screenshot_3 from "../../../../assets/landing/screenshot3.png";
import screenshot_4 from "../../../../assets/landing/screenshot4.png";

const Phones = () => {
  const screenshotRef = useRef(null);

  useEffect(() => {
    const images = [screenshot_1, screenshot_2, screenshot_3, screenshot_4];
    let currentIndex = 0;

    const screenshotInterval = setInterval(() => {
      if (currentIndex === images.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
      screenshotRef.current.src = images[currentIndex];
      // screenshotRef.current.classList.remove("fadeIn");
      // screenshotRef.current.classList.remove("fadeOut");
      // setTimeout(() => {
      //   screenshotRef.current.classList.add("fadeIn");
      // }, currentIndex * 3000);
      // setTimeout(() => {
      //   screenshotRef.current.classList.add("fadeOut");
      // }, 3000);
    }, 3000);

    return () => clearInterval(screenshotInterval);
  }, []);

  return (
    <div
      className="phones-container"
      style={{ backgroundImage: `url('${landing_phones}')` }}
    >
      <img
        src={screenshot_1}
        alt="Instagram on Mobile"
        className="screenshot"
        ref={screenshotRef}
      />
    </div>
  );
};

export default Phones;
