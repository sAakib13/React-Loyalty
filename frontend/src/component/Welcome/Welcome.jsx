"use client";

import { Button, Checkbox, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { redemption } from "../../utlis/redemption"; // Adjust the path as needed
import coin from "../../assets/coin.png"
import phone from "../../assets/phone.png"
import calendar from "../../assets/calendar.png"
import mail from "../../assets/mail.png"
import age from "../../assets/age.png"

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
    <div className="sm:2 flex min-h-screen flex-col items-center  bg-white from-gray-50 to-gray-100 md:p-2 lg:p-4">
      {/* Top Bar: Points and Dropdown */}
      <div className="flex items-center justify-end w-full p-4 bg-white rounded-lg gap-4">
        {/* Points Section */}
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md shadow-sm">
          <img src={coin} className="w-5 h-auto" alt="Coin Icon" />
          <p className="text-md lg:font-bold md:font-semibold sm:font-semibold text-yellow-500">
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
                <button
                  onClick={handleLogout}
                  className="text-black bg-gray-200 hover:bg-gray-300 rounded-md border-black px-3 py-1"
                >
                  Log Out
                </button>
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
        <div className="lg:max-w-7xl md:max-w-4xl sm:max-w-2xl mx-auto rounded-lg overflow-hidden bg-gradient-to-br">
          {/* Header Section */}
          <div className="bg-primary text-white p-6">
            <h2 className="lg:text-xl md:text-md sm:text-sm font-semibold">Rewards</h2>
          </div>

          <div className="p-6 flex flex-col md:flex-row gap-6">
            {/* My Points Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="lg:text-lg md:text-md sm:text-sm  font-bold text-primary">My Points</h3>
              <div className="mt-4 p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm flex-grow">
                <img src={coin} className="lg:w-10 md:w-8 sm:w-6 h-auto" alt="Coin Icon" />
                <p className="lg:text-4xl md:text-3xl sm:text-2xl font-bold text-primary">
                  {userData?.vars?.points || 0}
                </p>
                <p className="text-gray-600 mt-2 lg:text-lg md:text-md sm:text-sm ">Your Balance</p>
              </div>
            </div>

            {/* My Details Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="lg:text-lg md:text-md sm:text-sm  text-primary font-bold">My Details</h3>
              <div className="mt-4 p-6 space-y-2 bg-white rounded-lg shadow-sm flex-grow md:min-w-[24rem]  ">
                {[
                  { label: "Phone Number:", value: userData?.from_number || "N/A", icon: phone },
                  { label: "Date of Birth:", value: userData?.vars?.dob || "N/A", icon: calendar },
                  { label: "Email:", value: userData?.vars?.email || "N/A", icon: mail },
                  { label: "Age:", value: userData?.vars?.age || "N/A", icon: age },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between lg:gap-0 md:gap-3 sm:gap-3">
                    <div className="flex items-center gap-3">
                      <img src={item.icon} className="lg:w-6 md:w-4 sm:w-6 h-auto" alt={`${item.label} icon`} />
                      <p className="lg:text-lg md:text-md sm:text-sm text-gray-700 font-semibold">{item.label}</p>
                    </div>
                    <div className="border-2 border-primary rounded p-2 lg:w-40 md:w-40 sm:min-w-[9rem]">
                      <p className="lg:text-lg md:text-md sm:text-sm text-gray-700 font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        <div className="flex justify-center items-center">
          {redemptionResults.length > 0 && (
            <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-lg flex flex-col justify-center items-center flex-grow">
              <h2 className="mb-4 text-lg font-bold text-primary">
                Redemption Results
              </h2>
              <ul className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                  {redemptionResults.map((result, index) => (
                    <li key={index} className="rounded-lg bg-primary p-3 shadow-md text-white ">
                      <p className="text-md font-semibold">{result.item}</p>
                      <p className="text-sm">
                        Points Redeemed:{" "}
                        <span className="font-bold">{result.points}</span>
                      </p>
                      <p className="text-sm">{result.message}</p>
                    </li>
                  ))}</div>

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
          )}</div>


        <p className="text-2xl font-bold text-primary mt-4 mb-2 pl-6">
          Redeem
        </p>
        <div className="flex justify-center items-center">
          {/* Redemption Form */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col items-center rounded-lg shadow-md p-6 w-72 ${selectedItems.find(selected => selected.id === item.id) ? "bg-primary" : "bg-white"
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
                  className={`${selectedItems.find(selected => selected.id === item.id) ? "bg-white text-primary" : "bg-primary text-white"}  font-semibold flex items-center gap-2 cursor-pointer py-2 px-6 rounded-lg`}
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
        </div>



        {/* Single Redeem Button */}
        <div className="flex justify-center item-center mt-6 mb-6">
          <button
            onClick={handleRedemption}
            className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary transition"
          >
            Redeem Selected Items
          </button>
        </div>




      </div>
    </div>

  );
}
