import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateOTP } from "../../utlis/validateOTP";


const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
//   const { state } = useLocation(); // Get the phone number passed from the previous page
//   const { phone } = state || {}; // Destructure phone from the state

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
      <div className="flex w-1/2 flex-col items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="mt-4">
            <img src={logo} alt="logo"></img>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center bg-white">
        <form
          className="flex w-full max-w-sm flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-3xl font-bold text-primary">
            Enter Your OTP{" "}
          </h2>
          <div>
            <Label htmlFor="otp" value="Enter the 7-digit OTP sent to you" />
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
