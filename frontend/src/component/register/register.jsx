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
          <div className="mb-1 lg:w-0 md:w-[100%] sm:w-[100%]">
            <img src={logo} alt="Logo" className="w-36 mx-auto" />
          </div>
        </div>
        <form className="w-full max-w-sm flex flex-col lg:gap-4 md:gap-2 md:px-4 sm:px-7" onSubmit={handleSubmit}>
          <h2 className="md:mt-7 sm:mt-7 lg:mt-0 text-center lg:text-3xl sm:text-2xl md:text-2xl  font-bold lg:text-primary md:text-white sm:text-white">Registration Form</h2>
          <div>
            <Label htmlFor="name" value="Name" className="lg:text-black sm:text-white md:text-white" />
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
            <Label htmlFor="email" value="Email" className="lg:text-black sm:text-white md:text-white"></Label>
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
            <Label htmlFor="phone" value="Phone Number" className="lg:text-black sm:text-white md:text-white"></Label>
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
            <Label htmlFor="dob" value="Birth Date" className="lg:text-black sm:text-white md:text-white"></Label>
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
            <Label htmlFor="age" value="Age" className="lg:text-black sm:text-white md:text-white" />
            <TextInput
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-teal-600 sm:mt-4">
            Register
          </Button>
          <div className="mt-2 text-sm text-center">
            <a href="/login" className="lg:text-gray-500 lg:hover:text-teal-500 hover:underline  sm:text-white md:text-white sm:hover:text-black md:hover:text-black">Already have a account? Login Here</a>
          </div>
          {message.text && (
            <div
              className={`mt-4 rounded-lg p-2 text-center text-white ${message.type === "success" ? "bg-green-600" : "bg-red-600"
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
