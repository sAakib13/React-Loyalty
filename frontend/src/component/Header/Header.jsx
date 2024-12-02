import React from "react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  return (
    <header className="bg-dark p-4">
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
                className="hover:bg-primary hover:text-white text-tiny px-3 py-2 text-white"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:bg-primary  hover:text-white text-tiny px-3 py-2 text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#guide"
                className="hover:bg-primary hover:text-white text-tiny px-3 py-2 text-white"
              >
                Guide
              </a>
            </li>
            <li>
              <a
                href="#solution"
                className="hover:bg-primary hover:text-white text-tiny px-3 py-2 text-white"
              >
                Solution
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:bg-primary hover:text-white text-tiny px-3 py-2 text-white"
              >
                About
              </a>
            </li>
            <li>
              <a

                className="text-tiny px-3 py-2 text-blue-500 cursor-pointer"
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/login")}
                className="rounded-2xl border-2 border-blue-500 m-5 text-tiny px-3 py-2 text-white cursor-pointer  hover:text-white"
              >
                Loyalty Points
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
