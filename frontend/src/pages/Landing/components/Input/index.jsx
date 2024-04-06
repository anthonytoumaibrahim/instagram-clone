// Styles
import "./styles.css";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  handleChange = () => {},
}) => {
  return (
    <div className={`input-old-wrapper ${value !== "" ? "has-value" : ""}`}>
      <span className="label slideInUp">{placeholder}</span>
      <input
        type={type}
        className="input-old"
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
