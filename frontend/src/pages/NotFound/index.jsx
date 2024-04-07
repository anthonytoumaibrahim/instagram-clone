import { Link } from "react-router-dom";

// Styles
import "./styles.css";

const NotFound = () => {
  return (
    <div className="not-found text-center">
      <h1>The page you requested could not be found.</h1>
      <p>Please make sure you have the correct URL.</p>
      <Link to="/" className="button button-primary">
        Back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
