import Modal from "../../../components/Modal";
import Avatar from "../../../components/Avatar";
import "./styles.css";

// React Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const PostModal = ({ data, handleClose }) => {
  const { user } = data;

  return (
    <Modal handleClose={handleClose}>
      <div className="post-body">
        <div className="uploaded-images">
          {data.images.length > 1 ? (
            <Carousel showArrows={false} showStatus={false} showThumbs={false}>
              {data.images.map((image) => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt=""
                  className="uploaded-image"
                />
              ))}
            </Carousel>
          ) : (
            <img
              src={data.images[0].image_url}
              alt=""
              className="uploaded-image"
            />
          )}
        </div>

        <div className="options">
          <div className="avatar-wrapper">
            <Avatar
              size={28}
              username={user.username}
              avatar_url={user.avatar}
            />
          </div>
          <p className="caption">{data.caption}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
