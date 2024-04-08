import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { toast } from "react-toastify";

import UserPosts from "../components/UserPosts";

const Explore = () => {
  const sendRequest = useRequest();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sendRequest("GET", "/get-posts?limit=10")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        toast.error("Sorry, something went wrong.");
      });
  }, []);
  return (
    <div className="margin-top">
      <UserPosts posts={posts} />
    </div>
  );
};

export default Explore;
