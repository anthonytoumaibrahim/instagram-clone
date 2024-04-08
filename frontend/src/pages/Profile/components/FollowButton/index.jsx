import { useState } from "react";
import Button from "../../../../components/Button";
import { toast } from "react-toastify";
import { useRequest } from "../../../../core/hooks/useRequest";

const FollowButton = ({ id, is_following = false, handleFollow }) => {
  const sendRequest = useRequest();
  const [isLoading, setIsLoading] = useState(false);

  const follow = () => {
    setIsLoading(true);
    sendRequest("POST", "/follow", {
      id: id,
    })
      .then((response) => {})
      .catch((error) => {
        toast.error("Failed to follow user.");
      })
      .finally(() => {
        setIsLoading(false);
        handleFollow();
      });
  };

  return (
    <Button
      loading={isLoading}
      onClick={() => follow()}
      primary={is_following ? false : true}
    >
      {is_following ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
