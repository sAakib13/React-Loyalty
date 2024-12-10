import axios from "axios";

export const getContact = async ({ phone_number }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/get-contactID", {
      phone_number,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting contact:", error);
    throw error;
  }
};
