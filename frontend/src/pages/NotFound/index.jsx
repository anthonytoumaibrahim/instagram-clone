import { Link } from "react-router-dom";

// Styles
import "./styles.css";

const NotFound = () => {
  return (
    <div className="not-found text-center">
      <h2>Sorry, this page isn't available.</h2>
      <p>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link to="/" className="link link-dark">
          Go back to Instagram.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
