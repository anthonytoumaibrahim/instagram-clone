// Default Avatar
import default_avatar from "../../assets/avatar.jpg";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./styles.css";

const Avatar = ({
  avatar_url = null,
  size = 22,
  username = null,
  alt = "Avatar",
  className,
  onClick = () => {},
}) => {
  const avatarSelector = useSelector((state) => state.userSlice);
  const url = avatar_url
    ? avatar_url
    : avatarSelector.avatar
    ? avatarSelector.avatar
    : default_avatar;

  const avatarImg = (
    <img
      src={url}
      alt={
        username === true ? avatarSelector.username : username ? username : alt
      }
      width={size}
      height={size}
      className={`avatar ${className}`}
      onClick={() => onClick()}
    />
  );
  return username ? (
    <div className="avatar-with-name">
      {avatarImg}{" "}
      <span>{username === true ? avatarSelector.username : username}</span>
    </div>
  ) : (
    avatarImg
  );
};

export default Avatar;
