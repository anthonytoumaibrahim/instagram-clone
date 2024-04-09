import { useRef } from "react";
import Avatar from "../../../../components/Avatar";
import { toast } from "react-toastify";
import { useRequest } from "../../../../core/hooks/useRequest";

// Redux
import { useDispatch } from "react-redux";

const AvatarUploader = ({ avatar }) => {
  const dispatch = useDispatch();
  const request = useRequest();

  const handleUpload = async (file) => {
    if (!file) {
      return;
    }
    const form = new FormData();
    form.append("image", file);
    await request("POST", "/upload-pfp", form)
      .then((response) => {
        const { success, avatar } = response.data;
        if (success) {
          dispatch({
            type: "userSlice/updateUser",
            payload: {
              avatar: avatar,
            },
          });
        }
      })
      .catch((error) => {
        const { message } = error?.response?.data;
        toast.error(message ?? "Sorry, something went wrong.");
      });
  };

  const inputRef = useRef(null);
  return (
    <>
      <Avatar
        avatar_url={avatar}
        size={150}
        className="cursor-pointer"
        is_owner={true}
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
