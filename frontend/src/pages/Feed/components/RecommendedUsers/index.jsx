import { useEffect, useState } from "react";
import { useRequest } from "../../../../core/hooks/useRequest";

import "./styles.css";
import Avatar from "../../../../components/Avatar";
import FollowButton from "../../../Profile/components/FollowButton";

const RecommendedUsers = () => {
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

  const removeUser = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
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
            <FollowButton id={id} handleFollow={() => removeUser(id)} />
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedUsers;
