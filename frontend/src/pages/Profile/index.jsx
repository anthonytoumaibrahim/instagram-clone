// Styles
import "./styles.css";

// Components
import Avatar from "../../components/Avatar";

const Profile = () => {
  return (
    <>
      <section className="profile-info">
        <div className="avatar-uploader">
          <Avatar size={150} />
        </div>

        <div className="info-wrapper">
          <div className="username">
            <h3>anthonyibrahim52</h3>
            <button className="button button-muted">Edit profile</button>
          </div>

          <div className="followers">
            <div>
              <strong>0</strong> <span>posts</span>
            </div>
            <div>
              <strong>5</strong> <span>followers</span>
            </div>
            <div>
              <strong>17</strong> <span>following</span>
            </div>
          </div>

          <p className="font-bold">Anthony Ibrahim</p>
        </div>
      </section>
    </>
  );
};

export default Profile;
