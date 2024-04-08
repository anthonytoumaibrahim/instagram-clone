import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLink } from "react-icons/fa6";
import { useSelector } from "react-redux";

// Styles
import "./styles.css";

// Components
import AvatarUploader from "./components/AvatarUploader";
import UserPosts from "../components/UserPosts";
import Avatar from "../../components/Avatar";
import FollowButton from "./components/FollowButton";

// Icons
import { IoMdGrid } from "react-icons/io";
import { TbUserSquare } from "react-icons/tb";
import { RiImageAddLine } from "react-icons/ri";

const Profile = () => {
  const usernameSelector = useSelector((state) => state.userSlice.username);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const sendRequest = useRequest();
  const navigate = useNavigate();
  const { username } = useParams();

  const isOwner = usernameSelector === username || !username;

  const getProfile = () => {
    sendRequest("GET", `/profile${username ? `/${username}` : ""}`)
      .then((response) => {
        const { profile, posts } = response.data;
        setProfile(profile);
        setPosts(posts);
      })
      .catch((error) => {
        // Profile not found
        toast.error("Profile not found.");
        navigate("/");
      });
  };

  useEffect(() => {
    getProfile();
  }, [username]);

  return (
    <>
      <section className="profile-info">
        <div className="avatar-uploader">
          {isOwner ? (
            <AvatarUploader />
          ) : (
            <Avatar avatar_url={profile.avatar} size={150} />
          )}
        </div>

        <div className="info-wrapper">
          <div className="username">
            <h3>{profile.username}</h3>
            {isOwner && (
              <button
                className="button button-muted"
                onClick={() => navigate("/edit-profile")}
              >
                Edit profile
              </button>
            )}
            {!isOwner && (
              <>
                <FollowButton
                  id={profile.id}
                  is_following={profile.is_following}
                  handleFollow={() =>
                    setProfile({
                      ...profile,
                      is_following: !profile.is_following,
                    })
                  }
                />
              </>
            )}
          </div>

          <div className="followers">
            <div>
              <strong>{profile.posts_count}</strong> <span>posts</span>
            </div>
            <div>
              <strong>{profile.followers_count}</strong> <span>followers</span>
            </div>
            <div>
              <strong>{profile.following_count}</strong> <span>following</span>
            </div>
          </div>

          <div className="bio">
            <p className="font-bold">{profile.full_name}</p>
            <p>{profile.bio}</p>
            <p>
              {profile.website && (
                <a
                  className="website-link"
                  href={profile.website}
                  target="_blank"
                >
                  <FaLink /> {profile.website}
                </a>
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="posts-tabs">
        <button className="tab-selector active">
          <IoMdGrid /> Posts
        </button>
        <button className="tab-selector">
          <TbUserSquare /> Tagged
        </button>
      </div>
      {posts.length > 0 ? (
        <UserPosts posts={posts} />
      ) : (
        <div className="no-posts-yet">
          <RiImageAddLine size={44} />
          <h3>You don't have any posts yet</h3>
        </div>
      )}
    </>
  );
};

export default Profile;
