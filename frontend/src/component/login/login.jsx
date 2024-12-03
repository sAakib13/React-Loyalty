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
      navigate("/otp", { state: { phone } });
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="flex lg:w-1/2 md:w-0 sm:w-0 flex-col items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex lg:w-1/2 md:w-[100%] sm:w-[100%] flex-col items-center justify-center lg:bg-white md:bg-primary sm:bg-primary" >
        <div className="text-center">
          <div className="mb-4 lg:w-0 md:w-[100%] sm:w-[100%]">
            <img src={logo} alt="Logo" className="w-36 mx-auto" />
          </div>
        </div>
        <form
          className="flex w-full max-w-sm flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="md:mt-8 sm:mt-8 lg:mt-0 text-center lg:text-3xl sm:text-2xl md:text-2xl  font-bold lg:text-primary md:text-white sm:text-white">
            Log in
          </h2>
          <div>
            <Label htmlFor="phonenumber" value="Phone Number" className="lg:text-black sm:text-white md:text-white" />
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
          <a href="/register" className="lg:text-gray-500 lg:hover:text-teal-500 hover:underline  sm:text-white md:text-white sm:hover:text-black md:hover:text-black">Don't have a account? Register Here</a>
        </div>
      </div>
    </div>
  );
}
