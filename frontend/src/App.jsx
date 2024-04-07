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

// Layouts
import UserLayout from "./pages/layouts/UserLayout";

// Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const App = () => {
  const tokenSelector = useSelector((state) => state.userSlice.token);

  return (
    <BrowserRouter>
      <Routes>
        {tokenSelector ? (
          <Route path="/" element={<UserLayout />}>
            <Route index element={<>hello</>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
