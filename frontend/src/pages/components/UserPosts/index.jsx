// Styles
import "./styles.css";
// Icons
import Post from "../Post";

const UserPosts = ({ posts, updatePost }) => {
  return (
    <section className="posts">
      {posts?.map((post) => {
        const { id, caption, created_at, images } = post;
        return (
          <Post
            key={id}
            post={post}
            images={images}
            updatePost={(id, data) => updatePost(id, data)}
          />
        );
      })}
    </section>
  );
};

export default UserPosts;
