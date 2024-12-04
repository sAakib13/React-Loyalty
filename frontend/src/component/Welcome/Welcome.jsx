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
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">

            {/* Avatar and Dropdown Section */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
                <Dropdown inline label={
                    <Avatar
                        img={user}
                        alt="User"
                        rounded
                        className="w-8"
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
            <h1 className="text-5xl font-extrabold text-primary mb-4">Hello User, Welcome!</h1>
            <p className="text-lg text-gray-600 mb-6">Redeem Your Loyalty Points and Get Exciting Rewards</p>

            {/* Loyalty Items Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { id: '1', name: 'Camera', points: "200" },
                    { id: '2', name: 'HeadPhones', points: "100" },
                    { id: '3', name: 'Television', points: "1000" },
                    { id: '4', name: 'SmartPhones', points: "300" },
                    { id: '5', name: 'Mouse', points: "100" },
                    { id: '6', name: 'Movie Ticket', points: "50" }
                ].map(item => (
                    <div key={item.id} className="bg-primary text-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-center space-x-2 mb-4">
                        <Checkbox id={item.id} />
                        <label htmlFor={item.id} className="text-lg">{item.name} - {item.points} points</label>
                    </div>
                ))}


            </div>

            {/* Redeem Button */}
            <Button className="bg-primary text-white font-semibold py-2 px-6 rounded-full mb-4">
                Redeem Now
            </Button>

            {/* Logout Button */}
            <Button onClick={handleLogout} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-full mb-4">
                Log Out
            </Button>
        </div>
    );
}
