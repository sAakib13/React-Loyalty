"use client";
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // navigate("/welcome")
    navigate("/welcome", { state: { phone } }); // Pass email to the welcome page
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
            <Label htmlFor="phonenumber" value="Phone Number" />
            <TextInput
              id="phonenumber"
              type="phonenumber"
              placeholder="+9779812345678"
              required
              style={{ backgroundColor: "white" }}
              onChange={(e) => setPhoneNumber(e.target.value)} // Capture phonenumber input
            />
          </div>
          {/* <div>
            <Label htmlFor="password1" value="Password" />
            <TextInput
              id="password1"
              type="password"
              placeholder="Enter your Password"
              required
            />
          </div> */}
          <Button type="submit" className="bg-primary hover:bg-teal-600">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
