import { useState } from "react";
import { useRequest } from "../../../../core/hooks/useRequest";

// Styles
import "./styles.css";
// Icons
import { IoMdGrid } from "react-icons/io";
import { TbUserSquare } from "react-icons/tb";
import { FaHeart, FaComments } from "react-icons/fa6";
import { BsImages } from "react-icons/bs";

const UserPosts = ({ posts }) => {
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

      <section className="posts">
        {posts?.map((post) => {
          const { id, caption, created_at, images } = post;
          return (
            <div className="post" key={id}>
              {images.length > 1 && <BsImages size={24} className="multiple-images" />}
              <img src={images[0].image_url} />
              <div className="likes-and-comments">
                <div>
                  <FaHeart /> 288
                </div>
                <div>
                  <FaComments /> 11
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default UserPosts;
