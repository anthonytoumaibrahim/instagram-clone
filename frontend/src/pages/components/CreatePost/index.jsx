import { useRef, useState } from "react";

// Styles
import "./styles.css";

// Icons
import { LiaTimesSolid } from "react-icons/lia";
import { FcStackOfPhotos } from "react-icons/fc";
import { GoArrowLeft } from "react-icons/go";
import Avatar from "../../../components/Avatar";

const CreatePost = ({ handleClose = () => {} }) => {
  const [stage, setStage] = useState("caption");
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  const handleFilesUpload = (files) => {
    setStage("caption");
    const acceptedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
      "image/gif",
    ];
    let validatedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const type = files[i].type;
      if (acceptedTypes.includes(type)) {
        validatedFiles.push(files[i]);
      }
    }

    setFiles(validatedFiles);
  };

  return (
    <div className="post-modal">
      <LiaTimesSolid size={32} className="close-icon" onClick={handleClose} />
      <div className="overlay" onClick={handleClose}></div>
      <div className="body">
        <div className="title">
          {stage !== "upload" && (
            <GoArrowLeft
              size={32}
              className="back-btn"
              onClick={() => {
                setStage("upload");
                setFiles([]);
              }}
            />
          )}{" "}
          Create new post
        </div>
        <div className="content">
          {stage === "upload" && (
            <div className="upload-files">
              <FcStackOfPhotos size={128} />

              <h3>Drag photos here</h3>

              <button
                className="button button-primary"
                onClick={() => inputRef.current.click()}
              >
                Select from computer
              </button>
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                multiple
                onChange={(e) => handleFilesUpload(e.target.files)}
              />
            </div>
          )}

          {stage === "caption" && (
            <div className="caption-editor">
              <div className="uploaded-images">
                <img
                  src="https://i.ytimg.com/an_webp/0pT-dWpmwhA/mqdefault_6s.webp?du=3000&sqp=CLD4yrAG&rs=AOn4CLCcBJzJ7TLTzdkS1qqJM931lkVc8A"
                  alt=""
                  className="uploaded-image"
                />
              </div>

              <div className="options">
                <Avatar size={28} username={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
