// Styles
import "./styles.css";
// Icons
import Post from "../Post";

const UserPosts = ({ posts }) => {
  return (
    <section className="posts">
      {posts?.map((post) => {
        const { id, caption, created_at, images } = post;
        return <Post key={id} post={post} images={images} />;
      })}
    </section>
  );
};

export default UserPosts;
