import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// Styles
import "./styles.css";

// Components
import AvatarUploader from "./components/AvatarUploader";
import UserPosts from "./components/UserPosts";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const sendRequest = useRequest();
  const navigate = useNavigate();
  const avatarSelector = useSelector((state) => state.userSlice.avatar);

  const getProfile = () => {
    sendRequest("GET", "/profile")
      .then((response) => {
        const { profile } = response.data;
        setProfile(profile);
      })
      .catch((error) => {
        // Profile not found
        toast.error("Profile not found.");
        navigate("/");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <section className="profile-info">
        <div className="avatar-uploader">
          <AvatarUploader avatar={profile.avatar} />
        </div>

        <div className="info-wrapper">
          <div className="username">
            <h3>{profile.username}</h3>
            <button className="button button-muted">Edit profile</button>
          </div>

          <div className="followers">
            <div>
              <strong>0</strong> <span>posts</span>
            </div>
            <div>
              <strong>5</strong> <span>followers</span>
            </div>
            <div>
              <strong>17</strong> <span>following</span>
            </div>
          </div>

          <p className="font-bold">{profile.full_name}</p>
        </div>
      </section>

      <UserPosts />
    </>
  );
};

export default Profile;
