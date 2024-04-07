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
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Protected Route
import ProtectedRoute from "./core/routes/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/hello"
            element={<ProtectedRoute>Hello</ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
