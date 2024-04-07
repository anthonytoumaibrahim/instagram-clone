import { useEffect, useRef, useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";

// Styles
import "./styles.css";

// Icons
import { LiaTimesSolid } from "react-icons/lia";
import { FcStackOfPhotos } from "react-icons/fc";
import { GoArrowLeft } from "react-icons/go";
import Avatar from "../../../components/Avatar";

const CreatePost = ({ handleClose = () => {} }) => {
  const sendRequest = useRequest();
  const [stage, setStage] = useState("upload");
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [previewData, setPreviewData] = useState(null);

  const [caption, setCaption] = useState("");

  const submitPost = () => {
    btnRef.current.disabled = true;

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append(`images[${i}]`, files[i]);
    }
    form.append("caption", caption);

    sendRequest("POST", "/create-post", form)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          toast.success(message);
          handleClose();
        }
      })
      .catch((error) => {
        const { message } = error?.response?.data;
        toast.error(message ?? "Sorry, something went wrong.");
      })
      .finally(() => {
        if (btnRef) {
          btnRef.current.disabled = false;
        }
      });
  };

  const handleFilesUpload = (files) => {
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

    if (validatedFiles.length !== 0) {
      setFiles(validatedFiles);

      const reader = new FileReader();
      reader.readAsDataURL(validatedFiles[0]);
      reader.onload = (ev) => {
        setPreviewData(ev.target.result);
      };
      setStage("caption");
    } else {
      toast.error("Some of the files you uploaded weren't images.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    if (files && files.length) {
      handleFilesUpload(files);
    }
  };

  return (
    <div className="post-modal">
      <LiaTimesSolid size={32} className="close-icon" onClick={handleClose} />
      <div className="overlay" onClick={handleClose}></div>
      <div className="body">
        <div className="title">
          {stage !== "upload" && (
            <>
              <GoArrowLeft
                size={32}
                className="back-btn"
                onClick={() => {
                  setStage("upload");
                  setFiles([]);
                }}
              />
              <button
                className="post-btn button button-primary"
                onClick={submitPost}
                ref={btnRef}
              >
                Post
              </button>
            </>
          )}{" "}
          Create new post
        </div>
        <div
          className="content"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
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
                <img src={previewData} alt="" className="uploaded-image" />
              </div>

              <div className="options">
                <Avatar size={28} username={true} />
                <textarea
                  className="post-caption-editor"
                  placeholder="Write your caption here..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
