// Styles
import "./styles.css";

const Footer = () => {
  return (
    <footer className="landing-footer container">
      <nav className="footer-nav">
        <a href="#!">Meta</a>
        <a href="#!">About</a>
        <a href="#!">Blog</a>
        <a href="#!">Jobs</a>
        <a href="#!">Help</a>
        <a href="#!">API</a>
        <a href="#!">Privacy</a>
        <a href="#!">Terms</a>
        <a href="#!">Locations</a>
        <a href="#!">Instagram Lite</a>
        <a href="#!">Threads</a>
        <a href="#!">Contact Uploading & Non-Users</a>
        <a href="#!">Meta Verified</a>
      </nav>
      <div className="copyright">
        <select defaultValue="en">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <p>&copy; 2024 Instagram from Meta</p>
      </div>
    </footer>
  );
};

export default Footer;
