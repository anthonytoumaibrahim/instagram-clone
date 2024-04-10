import { useState } from "react";
import { Link } from "react-router-dom";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Styles
import "./styles.css";

// Icons
import { FaHeart, FaRegHeart, FaComments } from "react-icons/fa6";
import { BsImages } from "react-icons/bs";

// Components
import Loader from "../../../components/Loader";
import PostModal from "../PostModal";
import Avatar from "../../../components/Avatar";

const Post = ({ post, images, fullForm = false }) => {
  const [showPost, setShowPost] = useState(false);
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const likePost = () => {
    setIsLoading(true);
    sendRequest("POST", "/like-post", {
      post_id: post.id,
    })
      .then((response) => {
        const { success } = response;
        dispatch({
          type: "postsSlice/likePost",
          payload: post.id,
        });
      })
      .catch((error) => {
        toast.error("Sorry, couldn't like post.");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      {showPost && (
        <PostModal data={post} handleClose={() => setShowPost(false)} />
      )}
      {fullForm ? (
        <div className="post">
          <div className="post-header">
            <Avatar
              size={32}
              avatar_url={post.user.avatar}
              username={post.user.username}
            />
          </div>

          {images.length > 1 && (
            <BsImages size={24} className="multiple-images" />
          )}
          <img
            src={images[0].image_url}
            className="post-image"
            onClick={() => setShowPost(true)}
          />

          <div className="post-footer">
            <div className="post-likes cursor-pointer" onClick={likePost}>
              {isLoading ? (
                <Loader width={24} />
              ) : post.liked_by_user ? (
                <FaHeart size={24} className="text-error" />
              ) : (
                <FaRegHeart size={24} />
              )}
              {post.liked_by_users_count} likes
            </div>
            <div className="post-caption">
              <Link className="username" to={`/profile/${post.user.username}`}>
                {post.user.username}
              </Link>
              <p>{post.caption}</p>
            </div>
            <p
              className="text-muted cursor-pointer"
              onClick={() => setShowPost(true)}
            >
              View all {post.comments_count !== 0 ? post.comments_count : ""}{" "}
              comments
            </p>
            <p
              className="text-muted cursor-pointer"
              onClick={() => setShowPost(true)}
            >
              Add a comment...
            </p>
          </div>
        </div>
      ) : (
        <div className="post" onClick={() => setShowPost(true)}>
          {images.length > 1 && (
            <BsImages size={24} className="multiple-images" />
          )}
          <img src={images[0].image_url} />
          <div className="likes-and-comments">
            <div>
              <FaHeart /> {post.liked_by_users_count}
            </div>
            <div>
              <FaComments /> {post.comments_count}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
