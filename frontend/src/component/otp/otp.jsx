import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { validateOTP } from "../../utlis/validateOTP";


const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { state } = useLocation(); // Get the phone number passed from the previous page
  const { phone } = state || {}; // Destructure phone from the state

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the validateOTP function with the phone number and entered OTP
      const otpResponse = await validateOTP({ phone_number: phone, otp });

      if (otpResponse.success) {
        console.log("OTP verified successfully!");
        navigate("/welcome", { state: { phone } }); // Navigate to the welcome page
      } else {
        console.error("Invalid OTP:", otpResponse.message);
      }
    } catch (error) {
      console.error("Failed to validate OTP:", error);
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

      <div className="flex lg:w-1/2 md:w-[100%] sm:w-[100%] flex-col items-center justify-center lg:bg-white md:bg-primary sm:bg-primary" >
        <div className="text-center">
          <div className="mb-4 lg:w-0 md:w-[100%] sm:w-[100%]">
            <img src={logo} alt="Logo" className="w-36 mx-auto" />
          </div>
        </div>
        <form className="w-full max-w-sm flex flex-col gap-6 md:px-4 sm:px-7" onSubmit={handleSubmit}>
          <h2 className="md:mt-8 sm:mt-8 lg:mt-0 text-center lg:text-3xl sm:text-2xl md:text-2xl  font-bold lg:text-primary md:text-white sm:text-white">
            Enter Your OTP{" "}
          </h2>
          <div>
            <Label htmlFor="otp" value="Enter the 7-digit OTP sent to you" className="lg:text-black sm:text-white md:text-white" />
            <TextInput
              id="otp"
              type="otp"
              required
              style={{ backgroundColor: "white", color: "black" }}
              onChange={(e) => setOtp(e.target.value)} // Capture phonenumber input
            />
          </div>

          <Button type="submit" className="bg-primary hover:bg-teal-600">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
