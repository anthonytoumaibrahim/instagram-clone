// React stuff
import { useEffect, useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const tokenSelector = useSelector((state) => state.userSlice.token);
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!tokenSelector) {
      navigate("/");
    } else {
      setRender(true);
    }
  }, []);

  return render && children;
};

export default ProtectedRoute;
