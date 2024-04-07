// Default Avatar
import default_avatar from "../../assets/avatar.jpg";

// Styles
import "./styles.css";

const Avatar = ({ avatar_url, size = 22, alt = "Avatar", className }) => {
  const url = avatar_url ? avatar_url : default_avatar;
  return (
    <img src={url} alt={alt} width={size} className={`avatar ${className}`} />
  );
};

export default Avatar;