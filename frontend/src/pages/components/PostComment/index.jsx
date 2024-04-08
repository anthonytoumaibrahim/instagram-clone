import Avatar from "../../../components/Avatar";

import "./styles.css";

const PostComment = ({ data }) => {
  const { id, comment, created_at, user } = data;

  return (
    <div className="comment">
      <Avatar avatar_url={user.avatar} username={user.username} />
      <p>{comment}</p>
      <p className="date">{new Date(data.created_at).toLocaleDateString("en-GB")}</p>
    </div>
  );
};

export default PostComment;
