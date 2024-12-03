import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";
import { registerUser } from "../../utlis/registerUser";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the registerUser function with the form data
      const response = await registerUser({
        phone_number: formData.phone,
        name: formData.name,
        email: formData.email,
        dob: formData.dob,
        age: formData.age,
      });

      setMessage({ text: response.message, type: "success" });
    } catch (error) {
      setMessage({
        text: "Failed to register user. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 flex-col items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center bg-white">
        <form
          className="flex w-full max-w-sm flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-3xl font-bold text-primary">
            Registration Form
          </h2>
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="dob" value="Birth Date" />
            <TextInput
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="age" value="Age" />
            <TextInput
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-teal-600">
            Register
          </Button>
          {message.text && (
            <div
              className={`mt-4 rounded-lg p-2 text-center text-white ${
                message.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
