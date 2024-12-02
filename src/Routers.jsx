import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./component/login/login"; // Create this component
import Welcome from "./component/Welcome/Welcome";
import RegistrationForm from "./component/register/register";
// import About from "./About"; // Optional if needed
// import Services from "./Services"; // Optional if needed

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/register" element={<RegistrationForm />} />
      {/* <Route path="/services" element={<Services />} /> */}
    </Routes>
  );
}

export default Routers;
