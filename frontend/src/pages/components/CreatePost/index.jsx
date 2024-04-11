import { useRef, useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../../../components/Modal";

// Styles
import "./styles.css";

// Icons
import { FcStackOfPhotos } from "react-icons/fc";
import { GoArrowLeft } from "react-icons/go";
import Avatar from "../../../components/Avatar";

const CreatePost = ({ handleClose = () => {} }) => {
  const dispatch = useDispatch();
  const sendRequest = useRequest();
  const [stage, setStage] = useState("upload");
  const [files, setFiles] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [caption, setCaption] = useState("");
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const submitPost = () => {
    btnRef.current.disabled = true;

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append(`images[${i}]`, files[i]);
    }
    form.append("caption", caption);

    sendRequest("POST", "/create-post", form)
      .then((response) => {
        const { success, message, post } = response.data;
        if (success) {
          toast.success(message);
          dispatch({
            type: "postsSlice/addPost",
            payload: post,
          });
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
    const UPLOAD_LIMIT = 5;
    const acceptedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
      "image/gif",
      "image/webp",
    ];
    let validatedFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (i === UPLOAD_LIMIT) {
        break;
      }
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

  const dragAndDropRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    dragAndDropRef.current.classList.add("content-drag");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    dragAndDropRef.current.classList.remove("content-drag");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragAndDropRef.current.classList.remove("content-drag");

    const { files } = e.dataTransfer;

    if (files && files.length) {
      handleFilesUpload(files);
    }
  };

  return (
    <Modal
      title="Create new post"
      handleClose={handleClose}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      ref={dragAndDropRef}
    >
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
      )}
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
            <span className="nb-of-images">{files.length} images</span>
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
    </Modal>
  );
};

export default CreatePost;
