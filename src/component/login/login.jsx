"use client";
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/welcome", { state: { email } }); // Pass email to the welcome page
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar Section */}
      <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white">
        <div className="text-center">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-primary text-center">Log in</h2>
          <div>
            <Label htmlFor="email1" value="Email" />
            <TextInput
              id="email1"
              type="email"
              placeholder="joe@email.com"
              required
              onChange={(e) => setEmail(e.target.value)} // Capture email input
            />
          </div>
          <div>
            <Label htmlFor="password1" value="Password" />
            <TextInput
              id="password1"
              type="password"
              placeholder="Enter your Password"
              required
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-teal-600">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
