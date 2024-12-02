"use client";
import { useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";

export default function Welcome() {
    const location = useLocation();
    const { email } = location.state || {}; // Retrieve the email passed from the login page

    return (
        <div className="h-screen">

            {/* Welcome Section */}
            <div className="flex flex-col justify-center items-center bg-white h-screen">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome!</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Hello, {email || "User"}! You have successfully logged in.
                </p>
                <Button className="bg-primary hover:bg-teal-600">Log Out</Button>
            </div>
        </div>
    );
}
