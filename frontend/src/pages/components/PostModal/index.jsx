import { useEffect, useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Components
import Modal from "../../../components/Modal";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";

// Styles
import "./styles.css";

// React Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Icons
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import PostComment from "../PostComment";

const PostModal = ({ data, handleClose }) => {
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const { user } = data;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getComments = async () => {
    sendRequest("GET", `/comments?post_id=${data.id}`)
      .then((response) => {
        const { comments } = response.data;
        setComments(comments);
      })
      .catch((error) => toast.error("Couldn't get comments for this post..."));
  };

  const likePost = () => {
    sendRequest("POST", "/like-post", {
      post_id: data.id,
    })
      .then((response) => {
        const { success } = response;
        dispatch({
          type: "postsSlice/likePost",
          payload: data.id,
        });
      })
      .catch((error) => {
        toast.error("Sorry, couldn't like post.");
      });
  };

  const submitComment = async () => {
    setIsLoading(true);
    sendRequest("POST", "/comment", {
      post_id: data.id,
      comment: comment,
    })
      .then((response) => {
        const { success, message } = response.data;
        toast.success(message);
        getComments();
        setComment("");
      })
      .catch((error) => {
        toast.error("Sorry, your comment could not be posted.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Modal handleClose={handleClose}>
      <div className="post-body">
        <div className="uploaded-images">
          {data.images.length > 1 ? (
            <Carousel
              swipeable={true}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
            >
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
          <div className="content-wrapper">
            <p className="caption">{data.caption}</p>
          </div>

          <div className="comments-wrapper">
            {comments.map((comment) => (
              <PostComment key={comment.id} data={comment} />
            ))}
          </div>

          <div className="like-and-comment">
            <div className="post-like">
              <div className="post-info">
                <p className="font-bold">{data.liked_by_users_count} likes</p>
                <p>{new Date(data.created_at).toLocaleDateString("en-GB")}</p>
              </div>
              {data.liked_by_user ? (
                <FaHeart size={24} onClick={likePost} className="text-error" />
              ) : (
                <FaRegHeart size={24} onClick={likePost} />
              )}
            </div>
            <div className="comment-form">
              <textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <Button
                loading={isLoading}
                disabled={comment.length < 1}
                onClick={submitComment}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
