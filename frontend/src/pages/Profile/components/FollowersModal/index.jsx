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

const FollowersModal = ({ id = null, handleClose }) => {
  const sendRequest = useRequest();
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFollowers = () => {
    sendRequest("GET", `/followers${id ? `/${id}` : ""}`)
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
            is_following_back: !follower.is_following_back,
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
      {isLoading && <Loader width={54} />}
      {followers.map((follower) => {
        const { id, username, avatar, is_following_back } = follower;

        return (
          <div className="follower-wrapper" key={id}>
            <Avatar size={34} username={username} avatar_url={avatar} />
            <FollowButton
              id={id}
              is_following={is_following_back}
              handleFollow={() => handleFollow(id)}
            />
          </div>
        );
      })}
    </Modal>
  );
};

export default FollowersModal;