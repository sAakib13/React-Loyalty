import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import logo from "../../assets/telerivetlogo.webp";
// import { sendMessage } from "./sendMessage";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage({ text: "Registration successful!", type: "success" });
    }
    catch (error) {
      setMessage({ text: "Something went wrong. Please try again.", type: "error" });
    }

  }

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white">
        <div className="text-center">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-primary text-center">Registration Form</h2>
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ backgroundColor: "white", color: "black" }}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email"></Label>
            <TextInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ backgroundColor: "white", color: "black" }}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" value="Phone Number"></Label>
            <TextInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ backgroundColor: "white", color: "black" }}
              required
            />
          </div>
          <div>
            <Label htmlFor="dob" value="Birth Date"></Label>
            <TextInput
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              style={{ backgroundColor: "white", color: "black" }}
              required
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-teal-600">
            Register
          </Button>
          {message.text && (
            <div
              className={`mt-4 p-2 rounded-lg text-center text-white ${message.type === "success" ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )


};

export default RegistrationForm;
