const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
}

const FETCH_USER_DATA_URL =
  "https://api.telerivet.com/v1/projects/PJb993879964086d72/tables/DT932fc0bd7948618d/rows";

const API_URL =
  "https://api.telerivet.com/v1/projects/PJb993879964086d72/services/SVa4c8ef67ab98ee8c/invoke";

const API_KEY = "maDfO_xfsRc3VEH7Dzzi7mll9slFHTgELpMK";

app.get("/api/user-data", async (req, res) => {
  const { contact_id } = req.query; // Expect contact_id to be passed as a query parameter

  console.log("Fetching user data for contact_id:", contact_id);

  try {
    const response = await axios.get(
      `${FETCH_USER_DATA_URL}?contact_id=${contact_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString(
            "base64"
          )}`,
        },
      }
    );

    console.log("Fetched User Data:", response.data); // Log the response data for debugging

    res.json(response.data); // Forward the API response to the client
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

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

app.post("/register-user", async (req, res) => {
  const { phone_number, name, email, dob, age } = req.body;

  const API_URL_ADD_USER =
    "https://api.telerivet.com/v1/projects/PJb993879964086d72/services/SV70a0b59d483d613c/invoke";

  console.log("Registering user:", { phone_number, name, email, dob, age });

  try {
    // Call the Telerivet API to add the user
    const response = await axios.post(
      API_URL_ADD_USER,
      {
        api_key: API_KEY,
        context: "contact",
        phone_number,
        name,
        variables: {
          name,
          email,
          dob,
          age,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User added successfully to Telerivet:", response.data);

    // Respond with success
    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error(
      "Error occurred:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
});

app.post("/redemption", async (req, res) => {
  const { phone_number, currentPoints, selectedItems } = req.body;

  console.log("Received Redemption Request:", {
    phone_number,
    currentPoints,
    selectedItems,
  });

  try {
    // (Optional) Process the redemption data here
    // Example: Store or validate the redemption in your database

    // Then call the external API (e.g., Telerivet) for further processing
    const response = await axios.post(
      "https://api.telerivet.com/v1/projects/PJb993879964086d72/services/SV98e376b61115caec/invoke",
      {
        api_key: API_KEY, // Replace with your actual API key
        context: "contact",
        phone_number,
        currentPoints,
        selectedItems,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("External API response:", response.data);

    // Send success response
    res.json({ success: true, message: "Redemption successful!" });
  } catch (error) {
    console.error("Error during redemption:", error);
    res.status(500).json({ success: false, message: "Redemption failed." });
  }
});

const PORT = process.env.PORT || 5000; // Use Railway's PORT or default to 5000
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
