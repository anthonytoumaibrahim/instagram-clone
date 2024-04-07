// Styles
import "./styles.css";
// Icons
import { IoMdGrid } from "react-icons/io";

import { TbUserSquare } from "react-icons/tb";

const UserPosts = () => {
  return (
    <>
      <div className="posts-tabs">
        <button className="tab-selector active">
          <IoMdGrid /> Posts
        </button>
        <button className="tab-selector">
          <TbUserSquare /> Tagged
        </button>
      </div>
    </>
  );
};

export default UserPosts;
