import Loader from "../Loader";

const Button = ({
  primary = true,
  loading = false,
  disabled = null,
  onClick = () => {},
  className = "",
  children,
}) => {
  return (
    <button
      className={`button ${
        primary ? "button-primary" : "button-muted"
      } ${className}`}
      disabled={loading}
      onClick={() => onClick()}
      disabled={disabled ? disabled : loading}
    >
      {loading ? <Loader width={19} /> : children}
    </button>
  );
};

export default Button;
