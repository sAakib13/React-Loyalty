import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate(); // Initialize the navigation hook

  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="text-xl font-semibold text-gray-800">
            Flowbite React
          </span>
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="/" className="text-gray-800 hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="text-gray-800 hover:text-blue-600">
            About
          </a>
          <a href="/services" className="text-gray-800 hover:text-blue-600">
            Services
          </a>
          <a href="/pricing" className="text-gray-800 hover:text-blue-600">
            Pricing
          </a>
          <a href="/contact" className="text-gray-800 hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Get Started Button */}
        <Button onClick={() => navigate("/login")}>Get started</Button>
      </nav>
    </div>
  );
}

export default App;
