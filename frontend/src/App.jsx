// React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Hello World</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
