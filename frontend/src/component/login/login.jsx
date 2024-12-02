"use client";
import { Button, Label, TextInput } from "flowbite-react";
import "../../index.css";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { generateOTP } from "../../utlis/genrateOTP";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhoneNumber] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // navigate("/welcome")
  //   navigate("/welcome", { state: { phone } }); // Pass email to the welcome page
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the generateOTP function with the phone number
      const otpResponse = await generateOTP({
        phone_number: phone, // Pass the phone number dynamically
      });

      console.log("OTP Response:", otpResponse);
      // Navigate to the welcome page with phone state
      navigate("/welcome", { state: { phone } });
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-white">
        <form
          className="flex w-full max-w-sm flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-3xl font-bold text-primary">
            Log in
          </h2>
          <div>
            <Label htmlFor="phonenumber" value="Phone Number" />
            <TextInput
              id="phonenumber"
              type="phonenumber"
              placeholder="+9779812345678"
              required
              style={{ backgroundColor: "white", color: "black" }}
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
        <div className="mt-4 text-sm">
          <a href="/register" className="text-gray-500 hover:text-teal-500 hover:underline">Don't have a account? Register Here</a>
        </div>
      </div>
    </div>
  );
}
