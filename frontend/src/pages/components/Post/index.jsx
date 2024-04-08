import { useState } from "react";
import "./styles.css";

import { FaHeart, FaComments } from "react-icons/fa6";
import { BsImages } from "react-icons/bs";

import PostModal from "../PostModal";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";

const Post = ({ post, images, fullForm = false }) => {
  const [showPost, setShowPost] = useState(false);
  return (
    <>
      {showPost && (
        <PostModal data={post} handleClose={() => setShowPost(false)} />
      )}
      {fullForm ? (
        <div className="post" onClick={() => setShowPost(true)}>
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
          <img src={images[0].image_url} className="post-image" />

          <div className="post-footer">
            <p className="post-likes">{post.liked_by_users_count} likes</p>
            <div className="post-caption">
              <Link className="username" to={`/profile/${post.user.username}`}>
                {post.user.username}
              </Link>
              <p>{post.caption}</p>
            </div>
            <p className="text-muted">
              View all {post.comments_count !== 0 ? post.comments_count : ""}{" "}
              comments
            </p>
            <p className="text-muted">Add a comment...</p>
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
