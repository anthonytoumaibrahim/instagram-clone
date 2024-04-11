import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLink } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";

// Styles
import "./styles.css";

// Components
import AvatarUploader from "./components/AvatarUploader";
import UserPosts from "../components/UserPosts";
import Avatar from "../../components/Avatar";
import FollowButton from "../components/FollowButton";
import FollowersModal from "./components/FollowersModal";

// Icons
import { IoMdGrid } from "react-icons/io";
import { TbUserSquare } from "react-icons/tb";
import { FcRemoveImage } from "react-icons/fc";

const Profile = () => {
  const usernameSelector = useSelector((state) => state.userSlice.username);
  const postsSelector = useSelector((state) => state.postsSlice);
  const dispatch = useDispatch();
  const sendRequest = useRequest();
  const navigate = useNavigate();
  const { username } = useParams();

  const [profile, setProfile] = useState({});
  const [followersModal, showFollowersModal] = useState(false);
  const [followingModal, showFollowingModal] = useState(false);

  const isOwner = usernameSelector === username || !username;

  const getProfile = () => {
    sendRequest("GET", `/profile${username ? `/${username}` : ""}`)
      .then((response) => {
        const { profile, posts } = response.data;
        setProfile(profile);
        dispatch({
          type: "postsSlice/setPosts",
          payload: posts,
        });
      })
      .catch((error) => {
        toast.error("Profile not found.");
        navigate("/");
      });
  };

  useEffect(() => {
    getProfile();
  }, [username]);

  return (
    <>
      {followersModal && (
        <FollowersModal
          id={profile.id}
          handleClose={() => showFollowersModal(false)}
        />
      )}
      {followingModal && (
        <FollowersModal
          type="following"
          id={profile.id}
          handleClose={() => showFollowingModal(false)}
        />
      )}
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
            <div
              onClick={() => showFollowersModal(true)}
              className="modal-link"
            >
              <strong>{profile.followers_count}</strong> <span>followers</span>
            </div>
            <div
              onClick={() => showFollowingModal(true)}
              className="modal-link"
            >
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
      {postsSelector.length > 0 ? (
        <UserPosts />
      ) : (
        <div className="no-posts-yet">
          <FcRemoveImage size={64} />
          <h3>
            {isOwner
              ? "You don't have any posts yet"
              : "This user doesn't have any posts yet"}
          </h3>
        </div>
      )}
    </>
  );
};

export default Profile;
