import { useState } from "react";
import PostModal from "../PostModal";

// Styles
import "./styles.css";
// Icons
import { IoMdGrid } from "react-icons/io";
import { TbUserSquare } from "react-icons/tb";
import Post from "../Post";

const UserPosts = ({ posts }) => {
  const [shownPost, setShownPost] = useState(null);

  return (
    <>
      {shownPost && (
        <PostModal data={shownPost} handleClose={() => setShownPost(null)} />
      )}
      <div className="posts-tabs">
        <button className="tab-selector active">
          <IoMdGrid /> Posts
        </button>
        <button className="tab-selector">
          <TbUserSquare /> Tagged
        </button>
      </div>

      <section className="posts">
        {posts?.map((post) => {
          const { id, caption, created_at, images } = post;
          return <Post key={id} post={post} images={images} />;
        })}
      </section>
    </>
  );
};

export default UserPosts;
