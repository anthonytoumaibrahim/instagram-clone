import "./styles.css";

import { FaHeart, FaComments } from "react-icons/fa6";
import { BsImages } from "react-icons/bs";

const Post = ({ post, images, setShownPost }) => {
  return (
    <div className="post" onClick={() => setShownPost(post)}>
      {images.length > 1 && <BsImages size={24} className="multiple-images" />}
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
  );
};

export default Post;
