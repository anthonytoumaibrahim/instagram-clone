import UserPosts from "../components/UserPosts";
import { useRequest } from "../../core/hooks/useRequest";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Feed = () => {
  const sendRequest = useRequest();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sendRequest("GET", "/feed")
      .then((response) => {})
      .catch((error) => {
        toast.error("Sorry, something went wrong.");
      });
  }, []);

  return <section className="feed"></section>;
};

export default Feed;
