import { useEffect, useState } from "react";
import { useRequest } from "../../../../core/hooks/useRequest";

import "./styles.css";
import Avatar from "../../../../components/Avatar";
import FollowButton from "../../../components/FollowButton";

const RecommendedUsers = ({ updatePosts }) => {
  const sendRequest = useRequest();
  const [users, setUsers] = useState([]);

  const getRecommendedUsers = () => {
    sendRequest("GET", "/recommended")
      .then((response) => {
        const { recommended } = response.data;
        setUsers(recommended);
      })
      .catch((error) => {});
  };

  const handleFollow = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    updatePosts();
  };

  useEffect(() => {
    getRecommendedUsers();
  }, []);

  return (
    <div className="recommended-users">
      <p className="font-medium">Suggested for you</p>
      {users.map((user) => {
        const { id, username, avatar } = user;

        return (
          <div className="recommended-user" key={id}>
            <Avatar avatar_url={avatar} username={username} size={44} />
            <FollowButton id={id} handleFollow={() => handleFollow(id)} />
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedUsers;
