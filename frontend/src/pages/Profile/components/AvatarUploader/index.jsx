import { useRef } from "react";
import Avatar from "../../../../components/Avatar";
import { toast } from "react-toastify";
import { useRequest } from "../../../../core/hooks/useRequest";

// Redux
import { useSelector, useDispatch } from "react-redux";

const AvatarUploader = () => {
  const avatarSelector = useSelector((state) => state.userSlice.avatar);
  const request = useRequest();

  const handleUpload = async (file) => {
    const form = new FormData();
    form.append("image", file);
    await request("POST", "/upload-pfp", form)
      .then((response) => {})
      .catch((error) => {
        toast.error("Sorry, something went wrong.");
      });
  };

  const inputRef = useRef(null);
  return (
    <>
      <Avatar
        avatar_url={avatarSelector}
        size={150}
        className="cursor-pointer"
        onClick={() => inputRef.current.click()}
      />
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleUpload(e.target.files[0])}
      />
    </>
  );
};

export default AvatarUploader;
