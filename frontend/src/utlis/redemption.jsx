import axios from "axios";

export const registerUser = async ({ phone_number, name }) => {
  try {
    const response = await axios.post("http://localhost:5000/redemption", {
      phone_number,
      name,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
