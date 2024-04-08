import { useState } from "react";
import "./styles.css";

import { FaHeart, FaComments } from "react-icons/fa6";
import { BsImages } from "react-icons/bs";

import PostModal from "../PostModal";

const Post = ({ post, updatePost, images }) => {
  const [showPost, setShowPost] = useState(false);
  return (
    <>
      {showPost && (
        <PostModal data={post} updatePost={(id, data) => updatePost(id, data)} handleClose={() => setShowPost(false)} />
      )}
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
    </>
  );
};

export default Post;
