import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLink } from "react-icons/fa6";

// Styles
import "./styles.css";

// Components
import AvatarUploader from "./components/AvatarUploader";
import UserPosts from "./components/UserPosts";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
  });
  const sendRequest = useRequest();
  const navigate = useNavigate();

  const getProfile = () => {
    sendRequest("GET", "/profile")
      .then((response) => {
        const { profile, stats } = response.data;
        setProfile(profile);
        setStats({
          posts: stats.posts,
          followers: 0,
          following: 0,
        });
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
            <button
              className="button button-muted"
              onClick={() => navigate("/edit-profile")}
            >
              Edit profile
            </button>
          </div>

          <div className="followers">
            <div>
              <strong>{stats.posts}</strong> <span>posts</span>
            </div>
            <div>
              <strong>{stats.followers}</strong> <span>followers</span>
            </div>
            <div>
              <strong>{stats.following}</strong> <span>following</span>
            </div>
          </div>

          <p className="font-bold">{profile.full_name}</p>

          <div className="bio">
            {profile.bio}
            {profile.website && (
              <a
                className="website-link"
                href={profile.website}
                target="_blank"
              >
                <FaLink /> {profile.website}
              </a>
            )}
          </div>
        </div>
      </section>

      <UserPosts posts={profile.posts} />
    </>
  );
};

export default Profile;
