import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import UserPosts from "../components/UserPosts";

const Explore = () => {
  const dispatch = useDispatch();
  const sendRequest = useRequest();
  const [posts, setPosts] = useState([]);

  const updatePost = (id, data) => {
    const newPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            liked_by_users_count: data
              ? post.liked_by_users_count + 1
              : post.liked_by_users_count - 1,
            liked_by_user: data,
          }
        : post
    );
    setPosts(newPosts);
  };

  useEffect(() => {
    sendRequest("GET", "/get-posts?limit=10")
      .then((response) => {
        setPosts(response.data);
        dispatch({
          type: "postsSlice/setPosts",
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.error("Sorry, something went wrong.");
      });
  }, []);
  return (
    <div className="margin-top">
      <UserPosts
        posts={posts}
        updatePost={(id, data) => updatePost(id, data)}
      />
    </div>
  );
};

export default Explore;
