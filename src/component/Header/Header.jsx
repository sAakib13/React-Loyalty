import React from "react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate(); // Initialize the navigation hook
  return (
    <header className="bg-dark p-4 text-white">
      <div className="flex items-center justify-around">
        {/* Logo Section */}
        <div className="flex items-center justify-between">
          <img src={logo} alt="logo" className="h-12 w-auto"></img>
        </div>

        {/* Navigation Section */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#product"
                className="hover:bg-hover text-tiny px-3 py-2 text-white"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:bg-hover text-tiny px-3 py-2 text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#guide"
                className="hover:bg-hover text-tiny px-3 py-2 text-white"
              >
                Guide
              </a>
            </li>
            <li>
              <a
                href="#solution"
                className="hover:bg-hover text-tiny px-3 py-2 text-white"
              >
                Solution
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:bg-hover text-tiny px-3 py-2 text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/login")}
                className="text-tiny px-3 py-2 text-blue-500"
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                href="#loyalty"
                className="hover:bg-hover text-tiny px-3 py-2 text-white"
              >
                Loyalty
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
