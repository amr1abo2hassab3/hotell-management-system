import React, { useState } from "react";

type AddUserFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const AddUserForm = ({ setIsOpen, isOpen }: AddUserFormProps) => {
  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة الكود لإرسال البيانات إلى الخادم أو API
    console.log(userData);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className=" mx-auto md:min-w-[626px] md:min-h-[636px] w-[350px] bg-white p-8 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#202430]">Add New User</h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-600 hover:text-gray-800  transition-all duration-200"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#202430]"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-[#202430]"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#202430]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter user's email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#202430]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#202430]"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#986D3C]"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="w-full duration-300 p-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#986D3C] transition-colors"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-20 p-3 ml-4 bg-red-400 duration-300  text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
