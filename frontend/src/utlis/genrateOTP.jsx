import axios from "axios";

const API_URL =
  "https://api.telerivet.com/v1/projects/PJb993879964086d72/services/SVa4c8ef67ab98ee8c/invoke";
const API_KEY = "maDfO_xfsRc3VEH7Dzzi7mll9slFHTgELpMK"; // Replace with your actual API key

export const generateOTP = async () => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        context: "contact",
        phone_number: "555-0138",
        name: "Minito White",
        variables: {
          name: "Minito White",
          age: 33,
          email: "minito@example.com",
        },
      },
      {
        headers: {
          "X-Telerivet-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
