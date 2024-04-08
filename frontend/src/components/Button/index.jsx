import Loader from "../Loader";

const Button = ({ primary = true, loading = false, className, children }) => {
  return (
    <button
      className={`button ${primary ? "button-primary" : ""} ${className}`}
      disabled={loading}
    >
      {loading ? <Loader width={19} /> : children}
    </button>
  );
};

export default Button;
