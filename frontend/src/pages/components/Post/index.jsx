import { useState } from "react";
import "./styles.css";

import { FaHeart, FaComments } from "react-icons/fa6";
import { BsImages } from "react-icons/bs";

import PostModal from "../PostModal";

const Post = ({ post, images }) => {
  const [showPost, setShowPost] = useState(false);
  return (
    <>
      {showPost && (
        <PostModal data={post} handleClose={() => setShowPost(false)} />
      )}
      <div className="post" onClick={() => setShowPost(true)}>
        {images.length > 1 && (
          <BsImages size={24} className="multiple-images" />
        )}
        <img src={images[0].image_url} />
        <div className="likes-and-comments">
          <div>
            <FaHeart /> 288
          </div>
          <div>
            <FaComments /> 11
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
