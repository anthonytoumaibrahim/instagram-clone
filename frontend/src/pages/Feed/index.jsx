import { useRequest } from "../../core/hooks/useRequest";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import UserPosts from "../components/UserPosts";
import RecommendedUsers from "./components/RecommendedUsers";

import "./styles.css";
import { FaRegSadCry } from "react-icons/fa";

const Feed = () => {
  const dispatch = useDispatch();
  const sendRequest = useRequest();
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    sendRequest("GET", "/feed")
      .then((response) => {
        const { posts } = response.data;
        setPostsCount(posts.length);
        dispatch({
          type: "postsSlice/setPosts",
          payload: posts,
        });
      })
      .catch((error) => {
        toast.error("Sorry, something went wrong.");
      });
  }, []);

  return (
    <div className="margin-top feed-wrapper">
      <div className="feed-posts">
        {postsCount === 0 ? (
          <div className="no-posts-yet">
            <FaRegSadCry size={64} />
            <h3>Your feed is empty!</h3>
            <p>
              Follow some people to get posts on your feed, or explore latest
              posts.
            </p>
            <Link className="button button-primary" to="/explore">
              Let's Go
            </Link>
          </div>
        ) : (
          <UserPosts fullForm={true} />
        )}
      </div>
      <RecommendedUsers />
    </div>
  );
};

export default Feed;
