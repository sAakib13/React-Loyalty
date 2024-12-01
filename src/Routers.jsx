import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./login"; // Create this component
// import About from "./About"; // Optional if needed
// import Services from "./Services"; // Optional if needed

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/services" element={<Services />} /> */}
    </Routes>
  );
}

export default Routers;
