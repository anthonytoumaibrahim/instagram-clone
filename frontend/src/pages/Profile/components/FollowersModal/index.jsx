import { useEffect, useState } from "react";
import { useRequest } from "../../../../core/hooks/useRequest";
import { toast } from "react-toastify";

// Components
import Modal from "../../../../components/Modal";
import Avatar from "../../../../components/Avatar";
import Loader from "../../../../components/Loader";
import FollowButton from "../../../components/FollowButton";

// Styles
import "./styles.css";

const FollowersModal = ({ id = null, type = "followers", handleClose }) => {
  const sendRequest = useRequest();
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFollowers = async () => {
    await sendRequest("GET", `/followers${id ? `/${id}/${type}` : ""}`)
      .then((response) => {
        const { followers } = response.data;
        setFollowers(followers);
      })
      .catch((error) => {
        const { message } = error.response.data;
        toast.error(message ?? "Sorry, couldn't get followers.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleFollow = (id) => {
    const newFollowers = followers.map((follower) =>
      follower.id === id
        ? {
            ...follower,
            is_following: !follower.is_following,
          }
        : follower
    );
    setFollowers(newFollowers);
  };

  useEffect(() => {
    getFollowers();
  }, []);

  return (
    <Modal
      className="followers-modal-content"
      width={340}
      handleClose={handleClose}
    >
      <h3>{type === "followers" ? "Followers" : "Following"}</h3>
      {isLoading && <Loader width={54} />}
      {followers.map((follower) => {
        const { id, username, avatar, is_following } = follower;

        return (
          <div className="follower-wrapper" key={id}>
            <Avatar size={34} username={username} avatar_url={avatar} />
            <FollowButton
              id={id}
              is_following={is_following}
              handleFollow={() => handleFollow(id)}
            />
          </div>
        );
      })}
      {!isLoading && followers.length === 0 && <p>No followers to show.</p>}
    </Modal>
  );
};

export default FollowersModal;
