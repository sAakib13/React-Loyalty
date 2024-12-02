const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

const API_URL =
  "https://api.telerivet.com/v1/projects/PJb993879964086d72/services/SVa4c8ef67ab98ee8c/invoke";
const API_KEY = "maDfO_xfsRc3VEH7Dzzi7mll9slFHTgELpMK";

app.post("/generate-otp", async (req, res) => {
  const { phone_number } = req.body;

  console.log("Received request to generate OTP for:", phone_number); // Log the incoming request

  try {
    const response = await axios.post(
      API_URL,
      {
        api_key: API_KEY,
        context: "contact",
        phone_number: phone_number,
        variables: { name: "User" },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data); // Log the Telerivet response
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error occurred:",
      error.response ? error.response.data : error.message
    ); // Log the error details
    res.status(500).send("Failed to send OTP");
  }
});

app.post("/validate-otp", async (req, res) => {
  const { phone_number, otp } = req.body; // Get phone_number and user-entered OTP from the request
  const API_URL_VALIDATE =
    "https://api.telerivet.com/v1/projects/PJb993879964086d72/services/SVbf918bf3363669c8/invoke";

  console.log("Validating OTP for:", phone_number);

  try {
    // Call the Telerivet API to validate the OTP
    const response = await axios.post(
      API_URL_VALIDATE,
      {
        api_key: API_KEY,
        context: "contact",
        phone_number: phone_number,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the return_value (the actual OTP sent by Telerivet)
    const serverOtp = response.data.return_value;

    console.log("Server OTP:", serverOtp);

    // Check if the user-provided OTP matches the server OTP
    if (otp === serverOtp) {
      res.json({ success: true, message: "OTP verified successfully!" });
    } else {
      res.status(401).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(
      "Error occurred:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to validate OTP");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
