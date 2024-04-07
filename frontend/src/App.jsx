// React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Styles
import "./styles/main.css";
import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/buttons.css";
import "./styles/inputs.css";
import "./styles/animations.css";

// Redux
import { useSelector } from "react-redux";

// Protected Route
import ProtectedRoute from "./core/routes/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";

const App = () => {
  const tokenSelector = useSelector((state) => state.userSlice.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={tokenSelector ? <>hello</> : <Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
