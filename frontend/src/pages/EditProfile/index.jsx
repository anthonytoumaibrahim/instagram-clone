// React stuff
import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { toast } from "react-toastify";

// Components
import Button from "../../components/Button";

// Styles
import "./styles.css";

const EditProfile = () => {
  const sendRequest = useRequest();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    fullName: "",
    website: "",
    bio: "",
  });

  const handleInputChange = (type, value) => {
    setData({
      ...data,
      [type]: value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendRequest("POST", "/update-settings", data)
      .then((response) => {
        const { success, message } = response.data;
        toast.success(message);
      })
      .catch((error) => {
        const { message } = error?.response?.data;
        toast.error(message ?? "Sorry, something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    sendRequest("GET", "/get-settings")
      .then((response) => {
        const { website, bio, full_name } = response.data;
        setData({
          fullName: full_name ?? "",
          website: website ?? "",
          bio: bio ?? "",
        });
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="profile-editor">
      <h2>Edit Profile</h2>
      <form action="" onSubmit={save}>
        <div className="input-wrapper">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            value={data.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={data.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
          ></textarea>
        </div>

        <Button loading={isLoading}>Save Settings</Button>
      </form>
    </div>
  );
};

export default EditProfile;
