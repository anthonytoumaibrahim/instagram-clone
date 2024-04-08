import { useSelector } from "react-redux";

// Styles
import "./styles.css";
// Icons
import Post from "../Post";

const UserPosts = () => {
  const postsSelector = useSelector((state) => state.postsSlice);

  return (
    <section className="posts">
      {postsSelector?.map((post) => {
        const { id, caption, created_at, images } = post;
        return <Post key={id} post={post} images={images} />;
      })}
    </section>
  );
};

export default UserPosts;
