import React, { useState } from "react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, Button } from "flowbite-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Control Drawer visibility

  const handleClose = () => setIsOpen(false);
  const isRootPath = location.pathname === "/";
  return (
    <header className="bg-dark p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div>
          <img src={logo} alt="Telerivet Logo" className="lg:h-12 w-auto sm:h-12 md:h-5" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            {[
              { name: "Product", href: "#product" },
              { name: "Pricing", href: "#pricing" },
              { name: "Guide", href: "#guide" },
              { name: "Solution", href: "#solution" },
              { name: "About", href: "#about" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition duration-200 text-white lg:text-tiny sm:text-sm"
                >
                  {item.name}
                </a>
              </li>
            ))}
            {isRootPath && (
              <>
                <li>
                  <button
                    className="text-blue-500 px-4 py-2 lg:text-tiny sm:text-sm"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="rounded-2xl border-2 border-blue-500 px-4 py-2 text-white hover:bg-blue-500 transition duration-300 lg:text-tiny sm:text-sm"
                  >
                    Programs
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Drawer Toggle */}
        <Button onClick={() => setIsOpen(true)} className="md:hidden text-white">
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>

        {/* Drawer Component */}
        <Drawer open={isOpen} onClose={handleClose} position="right" className="w-1/2">
          {/* Custom Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={handleClose} className="text-gray-600">
              {/* Close (X) Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Items */}
          <Drawer.Items>
            <ul className="space-y-4">
              {[
                { name: "Product", href: "#product" },
                { name: "Pricing", href: "#pricing" },
                { name: "Guide", href: "#guide" },
                { name: "Solution", href: "#solution" },
                { name: "About", href: "#about" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
                    onClick={handleClose}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {isRootPath && (
                <>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-primary hover:bg-primary hover:text-white font-medium"
                      onClick={() => {
                        navigate("/signin");
                        handleClose();
                      }}
                    >
                      Sign In
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left rounded-lg border-2 border-blue-500 px-4 py-2 hover:bg-primary hover:text-white transition duration-300 font-medium"
                      onClick={() => {
                        navigate("/login");
                        handleClose();
                      }}
                    >
                      Programs
                    </button>
                  </li>
                </>
              )}
            </ul>
          </Drawer.Items>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
