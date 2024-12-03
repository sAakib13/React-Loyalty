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
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="flex lg:w-1/2 md:w-0 sm:w-0 flex-col items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="flex lg:w-1/2 md:w-[100%] sm:w-[100%] flex-col items-center justify-center lg:bg-white md:bg-primary sm:bg-primary" >
        <div className="text-center">
          <div className="mb-4 lg:w-0 md:w-[100%] sm:w-[100%]">
            <img src={logo} alt="Logo" className="w-36 mx-auto" />
          </div>
        </div>
        <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="md:mt-8 sm:mt-8 lg:mt-0 text-center lg:text-3xl sm:text-2xl md:text-2xl  font-bold lg:text-primary md:text-white sm:text-white">Registration Form</h2>
          <div>
            <Label htmlFor="name" value="Name" className="lg:text-black sm:text-white md:text-white" />
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
            <Label htmlFor="email" value="Email" className="lg:text-black sm:text-white md:text-white"></Label>
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
            <Label htmlFor="phone" value="Phone Number" className="lg:text-black sm:text-white md:text-white"></Label>
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
            <Label htmlFor="dob" value="Birth Date" className="lg:text-black sm:text-white md:text-white"></Label>
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
