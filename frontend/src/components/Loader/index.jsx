// Styles
import "./styles.css";

const Loader = ({ width = 50 }) => {
  return (
    <div className="loader-spinning" style={{ width: `${width}px` }}></div>
  );
};

export default Loader;
