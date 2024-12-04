"use client";
import { Button, Checkbox, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import user from "../../assets/user.png"

export default function Welcome() {
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 lg:p-4 md:p-2 sm:2">

            {/* Avatar and Dropdown Section */}
            <div className="absolute top-4 right-3 flex items-center space-x-2">
                <Dropdown inline label={
                    <Avatar
                        img={user}
                        alt="User"
                        rounded
                        className="lg:w-8 md:w-6 sm:w-6"
                    />
                }>
                    <Dropdown.Header>
                        <span className="block text-sm font-medium">Username</span>
                        <span className="block text-sm text-gray-500">xyz@gmail.com</span>
                        <span className="block text-sm text-gray-500">Loyalty Points: 100</span>
                    </Dropdown.Header>
                </Dropdown>
            </div>

            {/* Welcome Section */}
            <h1 className="lg:text-5xl font-extrabold text-primary mb-4 md:text-3xl sm:text-xl">Hello User, Welcome!</h1>
            <p className="lg:text-lg text-gray-600 mb-6 md:text-md sm:text-sm">Redeem Your Loyalty Points and Get Exciting Rewards</p>

            {/* Loyalty Items Section */}
            <div className="grid lg:grid-cols-3 lg:gap-4 md:gap-3 sm:gap-2 mb-6 md:grid-cols-2 sm:grid-cols-1">
                {[
                    { id: '1', name: 'Camera', points: "200" },
                    { id: '2', name: 'HeadPhones', points: "100" },
                    { id: '3', name: 'Television', points: "1000" },
                    { id: '4', name: 'SmartPhones', points: "300" },
                    { id: '5', name: 'Mouse', points: "100" },
                    { id: '6', name: 'Movie Ticket', points: "50" }
                ].map(item => (
                    <div key={item.id} className="bg-primary text-white lg:p-4 md:p-2 sm:p-2 rounded-lg shadow-md hover:shadow-lg flex items-center space-x-2 mb-4">
                        <Checkbox id={item.id} />
                        <label htmlFor={item.id} className="lg:text-lg md:text-md sm:text-sm">{item.name} - {item.points} points</label>
                    </div>
                ))}


            </div>

            {/* Redeem Button */}
            <Button className="bg-primary text-white font-semibold py-2 px-6 rounded-full lg:mb-4 md:mb-2 sm:mb-1 lg:text-lg md:text-md sm:text-sm">
                Redeem Now
            </Button>

            {/* Logout Button */}
            <Button onClick={handleLogout} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-full lg:mb-4 md:mb-2 sm:mb-1 lg:text-lg md:text-md sm:text-sm">
                Log Out
            </Button>
        </div>
    );
}
