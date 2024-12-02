"use client";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault()
        navigate("/")
    }

    return (
        <div className="h-screen">

            {/* Welcome Section */}
            <div className="flex flex-col justify-center items-center bg-white h-screen">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome!</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Hello,User! You have successfully logged in.
                </p>
                <div>
                    <p className="text-lg text-gray-700 mb-8">Email: xyz@gmail.com</p>
                    <p className="text-lg text-gray-700 mb-8">Phone: phone_number</p>
                    <p className="text-lg text-gray-700 mb-8">Loyalty points: loyalty_points</p>
                </div>
                <Button onClick={handleLogout} className="bg-primary hover:bg-teal-600">Log Out</Button>
            </div>
        </div>
    );
}
