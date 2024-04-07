import { useRef } from "react";

// Styles
import "./styles.css";

// Icons
import { LiaTimesSolid } from "react-icons/lia";

const CreatePost = ({ handleClose = () => {} }) => {
  const inputRef = useRef(null);

  return (
    <div className="post-modal">
      <LiaTimesSolid size={32} className="close-icon" onClick={handleClose} />
      <div className="overlay" onClick={handleClose}></div>
      <div className="body">
        <div className="title">Create new post</div>
        <div className="content">
          <h3>Drag photos here</h3>

          <button
            className="button button-primary"
            onClick={() => inputRef.current.click()}
          >
            Select from computer
          </button>
          <input type="file" className="hidden" ref={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
