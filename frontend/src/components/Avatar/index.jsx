import { Link } from "react-router-dom";

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
  is_owner = false,
  alt = "Avatar",
  className,
  onClick = () => {},
}) => {
  const avatarSelector = useSelector((state) => state.userSlice);
  const url = is_owner
    ? avatarSelector.avatar
    : avatar_url
    ? avatar_url
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
    <Link
      to={`${username !== true ? `/profile/${username}` : ""}`}
      className="avatar-with-name"
    >
      {avatarImg}{" "}
      <span>{username === true ? avatarSelector.username : username}</span>
    </Link>
  ) : (
    avatarImg
  );
};

export default Avatar;
