"use client";

import { Button, Checkbox, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { redemption } from "../../utlis/redemption"; // Adjust the path as needed

export default function Welcome() {
  const navigate = useNavigate();

  // State hooks for user data, loading, errors, selected items, and available items
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactId = "CT4dd4e07a77c5ffef"; // Replace with your actual contact_id
        const response = await axios.get(
          `http://localhost:5000/api/user-data`,
          {
            params: { contact_id: contactId },
          },
        );

        console.log("Response Data:", response.data);

        if (response.data.data && response.data.data.length > 0) {
          setUserData(response.data.data[0]);
        } else {
          throw new Error("No user data found.");
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error:", err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch items for redemption on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-items`);
        setItems(response.data); // Update state with the fetched items
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items");
      }
    };

    fetchItems();
  }, []);

  // Handle logout button click
  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/");
  };

  // Handle checkbox change for selecting items
  const handleCheckboxChange = (id, item, points) => {
    const updatedItems = [...selectedItems];
    const index = updatedItems.findIndex((selected) => selected.id === id);

    if (index > -1) {
      // Remove item if already selected
      updatedItems.splice(index, 1);
    } else {
      // Add item if not already selected
      updatedItems.push({ id, item, points });
    }

    setSelectedItems(updatedItems);
  };

  // Handle redemption submission
  const handleRedemption = async (event) => {
    event.preventDefault();

    const totalPoints = selectedItems.reduce(
      (acc, item) => acc + item.points,
      0,
    );

    if (userData?.vars?.points < totalPoints) {
      alert("Insufficient points to redeem the selected items.");
      return;
    }

    try {
      const response = await redemption({
        phone_number: userData?.from_number,
        currentPoints: userData?.vars?.points,
        selectedItems,
      });

      console.log("Redemption response:", response);
      alert("Redemption successful!");
      // Optionally, refresh user data to update points
    } catch (err) {
      console.error(
        "Error during redemption:",
        err.response ? err.response.data : err.message,
      );
      alert("Failed to complete redemption.");
    }
  };

  // Render loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Main return block
  return (
    <div className="sm:2 flex h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 md:p-2 lg:p-4">
      {/* User Dropdown */}
      <div className="absolute right-3 top-4 flex items-center space-x-2">
        <Dropdown
          inline
          label={
            <Avatar
              img={userImage}
              alt="User"
              rounded
              className="sm:w-6 md:w-6 lg:w-8"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-medium">
              {userData?.vars?.email || "Username"}
            </span>
            <span className="block text-sm text-gray-500">
              {userData?.vars?.email || "xyz@gmail.com"}
            </span>
            <span className="block text-sm text-gray-500">
              Loyalty Points: {userData?.vars?.points || 0}
            </span>
          </Dropdown.Header>
        </Dropdown>
      </div>

      {/* Welcome Section */}
      <h1 className="mb-4 font-extrabold text-primary sm:text-xl md:text-3xl lg:text-5xl">
        Hello {userData?.vars?.email.split("@")[0] || "User"}, Welcome!
      </h1>

      {/* User Details */}
      <div className="md:text-md mb-6 flex flex-col items-center space-y-2 text-gray-600 sm:text-sm lg:text-lg">
        <p>
          <span className="font-semibold">Age:</span>{" "}
          {userData?.vars?.age || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {userData?.vars?.dob || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {userData?.vars?.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Loyalty Points:</span>{" "}
          {userData?.vars?.points || 0}
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span>{" "}
          {userData?.from_number || "N/A"}
        </p>
      </div>

      <p className="md:text-md mb-6 text-gray-600 sm:text-sm lg:text-lg">
        Redeem Your Loyalty Points and Get Exciting Rewards
      </p>

      {/* Redemption Form */}
      <form
        onSubmit={handleRedemption}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="mb-6 grid sm:grid-cols-1 sm:gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="mb-4 flex items-center space-x-2 rounded-lg bg-primary text-white shadow-md hover:shadow-lg sm:p-2 md:p-2 lg:p-4"
            >
              <Checkbox
                id={item.id.toString()}
                onChange={() =>
                  handleCheckboxChange(item.id, item.item, item.points)
                }
              />
              <label
                htmlFor={item.id.toString()}
                className="md:text-md uppercase sm:text-sm lg:text-lg"
              >
                {item.item} - {item.points} points
              </label>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className="md:text-md rounded-full bg-primary px-6 py-2 font-semibold text-white sm:mb-1 sm:text-sm md:mb-2 lg:mb-4 lg:text-lg"
        >
          Redeem Now
        </Button>
      </form>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        className="md:text-md rounded-full bg-gray-600 px-6 py-2 font-semibold text-white hover:bg-gray-700 sm:mb-1 sm:text-sm md:mb-2 lg:mb-4 lg:text-lg"
      >
        Log Out
      </Button>
    </div>
  );
}
