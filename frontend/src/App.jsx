// React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Styles
import "./styles/main.css";
import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/buttons.css";
import "./styles/inputs.css"

// Pages
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
