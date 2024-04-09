import TimeAgo from "react-timeago";
import Avatar from "../../../components/Avatar";

import "./styles.css";

const PostComment = ({ data }) => {
  const { id, comment, created_at, user } = data;

  return (
    <div className="comment">
      <div className="avatar-date-wrapper">
        <Avatar avatar_url={user.avatar} username={user.username} />
        <p className="date">
          <TimeAgo date={data.created_at} />
        </p>
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default PostComment;
