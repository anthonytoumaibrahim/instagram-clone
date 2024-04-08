import { useSelector } from "react-redux";

// Styles
import "./styles.css";
// Icons
import Post from "../Post";

const UserPosts = ({ fullForm = false }) => {
  const postsSelector = useSelector((state) => state.postsSlice);

  return (
    <section className={`${fullForm ? "posts-full" : "posts"}`}>
      {postsSelector?.map((post) => {
        const { id, caption, created_at, images } = post;
        return (
          <Post key={id} post={post} images={images} fullForm={fullForm} />
        );
      })}
    </section>
  );
};

export default UserPosts;
