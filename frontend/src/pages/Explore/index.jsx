import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { toast } from "react-toastify";

import Post from "../Profile/components/Post";

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
    <section className="posts margin-top">
      {posts?.map((post) => {
        const { id, caption, created_at, images } = post;
        return <Post key={id} post={post} images={images} />;
      })}
    </section>
  );
};

export default Explore;
