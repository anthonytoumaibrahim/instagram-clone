import { useEffect, useState } from "react";
import { useRequest } from "../../core/hooks/useRequest";
import { toast } from "react-toastify";
import "./styles.css";

const EditProfile = () => {
  const sendRequest = useRequest();
  const [data, setData] = useState({
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
  };

  useEffect(() => {
    sendRequest("GET", "/get-settings")
      .then((response) => {
        const { website, bio } = response.data;
        setData({
          website: website ?? "",
          bio: bio ?? "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <div className="profile-editor">
      <h2>Edit Profile</h2>
      <form action="" onSubmit={save}>
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

        <button className="button button-primary">Save Settings</button>
      </form>
    </div>
  );
};

export default EditProfile;
