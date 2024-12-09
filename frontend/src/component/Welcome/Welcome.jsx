"use client";

import { Button, Checkbox, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { redemption } from "../../utlis/redemption"; // Adjust the path as needed
import coin from "../../assets/coin.png"
import reward from "../../assets/reward.jpg"

export default function Welcome() {
  const navigate = useNavigate();

  // State hooks for user data, loading, errors, selected items, and available items
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [redemptionResults, setRedemptionResults] = useState([]);
  const [redemptionSummary, setRedemptionSummary] = useState(null);

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

      if (response.success) {
        const { results, finalResult } = response.data.return_value;

        // Save results and summary in state
        setRedemptionResults(results);
        setRedemptionSummary(finalResult);

        alert("Redemption successful!");
      } else {
        throw new Error("Redemption response indicates failure.");
      }
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
    <div className="sm:2 flex min-h-screen flex-col items-center justify-center bg-white from-gray-50 to-gray-100 md:p-2 lg:p-4">
      {/* Top Bar: Points and Dropdown */}
      <div className="flex items-center justify-end w-full p-4 bg-white rounded-lg gap-4">
        {/* Points Section */}
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md shadow-sm">
          <img src={coin} className="w-5 h-auto" alt="Coin Icon" />
          <p className="text-md font-bold text-yellow-500">
            {userData?.vars?.points || 0}
          </p>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center gap-3">
          <span className="block text-sm font-medium text-gray-700">
            {userData?.vars?.email || "Username"}
          </span>
          <Dropdown
            inline
            label={
              <Avatar
                img={userImage}
                alt="User Avatar"
                rounded
                className="sm:w-6 md:w-6 lg:w-8"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium">
                <Button
                  onClick={handleLogout}
                  className="text-black bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
                >
                  Log Out
                </Button>
              </span>
            </Dropdown.Header>
          </Dropdown>
        </div>
      </div>

      {/* Welcome Section */}
      <h1 className="mb-7 mt-8 font-extrabold capitalize text-primary sm:text-2xl md:text-4xl lg:text-5xl">
        Hello {userData?.vars?.email.split("@")[0] || "User"}, Welcome!
      </h1>

      {/* Rest of the Content */}
      <div>
        {/* User Details Section */}
        <div className="max-w-7xl mx-auto rounded-lg overflow-hidden bg-gradient-to-br">
          {/* Header Section */}
          <div className="bg-primary text-white p-6">
            <h2 className="text-xl font-semibold">Rewards</h2>
          </div>

          <div className="p-6 flex flex-col md:flex-row gap-6">
            {/* My Points Section */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">My Points</h3>
              <div className="mt-4 flex flex-col items-center bg-white p-6 rounded-lg shadow-sm h-48">
                <img src={coin} className="w-10 h-auto" alt="Coin Icon" />
                <p className="text-4xl font-bold text-primary">
                  {userData?.vars?.points || 0}
                </p>
                <p className="text-gray-600 mt-2">Your Balance</p>
              </div>
            </div>

            {/* My Details Section */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">My Details</h3>
              <div className="mt-4 space-y-4 bg-white p-6 rounded-lg shadow-sm h-48">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-700">Phone Number:</p>
                  <p className="text-gray-900">{userData?.from_number || "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-700">Date of Birth:</p>
                  <p className="text-gray-900">{userData?.vars?.dob || "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-700">Email:</p>
                  <p className="text-gray-900">{userData?.vars?.email || "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-700">Age:</p>
                  <p className="text-gray-900">{userData?.vars?.age || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-800 mt-4 mb-2 pl-6">
          Redeem
        </p>

        {/* Redemption Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col items-center bg-white rounded-lg shadow-md p-6 w-72 ${selectedItems.find(selected => selected.id === item.id) ? "bg-blue-500" : "bg-white"
                }`}
            >
              {/* Item Image */}
              {/* <img
                src={reward}
                alt={item.item}
                className="w-full h-32 object-cover rounded-md mb-4"
              /> */}

              {/* Item Details */}
              <h3 className={`text-xl font-bold text-gray-800 mb-2 ${selectedItems.find(selected => selected.id === item.id) ? "text-white" : "text-primary"}`}>{item.item}</h3>
              <p className={`text-sm text-gray-600 mb-4 ${selectedItems.find(selected => selected.id === item.id) ? "text-white" : "text-gray-600"}`}>
                <span className={`text-primary font-bold ${selectedItems.find(selected => selected.id === item.id) ? "text-white" : "text-primary"}`}>{item.points}</span> points
              </p>

              {/* Button logic changes */}
              <label
                className={`${selectedItems.find(selected => selected.id === item.id) ? "bg-gray-500" : "bg-primary"} text-white flex items-center gap-2 cursor-pointer py-2 px-6 rounded-lg`}
              >
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedItems.find(selected => selected.id === item.id) ? true : false}
                  onChange={() => handleCheckboxChange(item.id, item.item, item.points)}
                  style={{ display: "none" }}
                />
                {selectedItems.find(selected => selected.id === item.id) ? "Selected" : "Select"}
              </label>
            </div>
          ))}
        </div>



        {/* Single Redeem Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleRedemption}
            className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary transition"
          >
            Redeem Selected Items
          </button>
        </div>



        {redemptionResults.length > 0 && (
          <div className="mt-6 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-primary">
              Redemption Results
            </h2>
            <ul className="space-y-3">
              {redemptionResults.map((result, index) => (
                <li key={index} className="rounded-lg bg-gray-100 p-3 shadow-md">
                  <p className="text-md font-semibold">{result.item}</p>
                  <p className="text-sm">
                    Points Redeemed:{" "}
                    <span className="font-bold">{result.points}</span>
                  </p>
                  <p className="text-sm">{result.message}</p>
                </li>
              ))}
            </ul>
            {redemptionSummary && (
              <div className="mt-4 text-center text-gray-700">
                <p className="font-bold">
                  Total Points Redeemed: {redemptionSummary.totalPointsRedeemed}
                </p>
                <p>Final Balance: {redemptionSummary.finalBalance}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

  );
}
