import { useState } from "react";
import Button from "../../../../components/Button";
import { toast } from "react-toastify";
import { useRequest } from "../../../../core/hooks/useRequest";

const FollowButton = ({ id }) => {
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
      });
  };

  return (
    <Button loading={isLoading} onClick={() => follow()}>
      Follow
    </Button>
  );
};

export default FollowButton;
