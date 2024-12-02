import React from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const OTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // navigate("/welcome")
        navigate("/welcome", { state: { phone } }); // Pass email to the welcome page
    };
    return (
        <div className='h-screen flex'>
            <div className='w-1/2 bg-primary flex flex-col justify-center items-center text-white'>
                <div className='text-center'>
                    <div className='mt-4'>
                        <img src={logo} alt='logo'></img>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-white">
                <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-primary text-center">Enter Your OTP </h2>
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
    )
}

export default OTP
