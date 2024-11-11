import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [credentials, setCredentials] = useState({ userID: "", name: "", email: "", password: "" });
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate(); 
  
    // Handle the input change
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
    
    // Handle form submission
    const handleOnClick = async (event) => {
      event.preventDefault();
      
      try {
        const response = await axios.put(
          `https://localhost:7208/api/UserAPI/id?id=${credentials.userID}`,
          credentials,{
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            }
          });
          if (response.status == 200) {
            navigate("/");
          }
    } catch (error) {
        toast.error(`Error : ${error.response.data.errorMesseges}`, {
            autoClose: 5000,
            hideProgressBar: false,
          });
    }
};


  return (
    <div>
        {/* Toast Container */}
      <ToastContainer />
      <form
        className="bg-gray-50 dark:bg-gray-900"
        onSubmit={(event) => handleOnClick(event)}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset your account password
              </h1>
              <div className="space-y-4 md:space-y-6">
              <div>
                  <label
                    htmlFor="userID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your user ID
                  </label>
                  <input
                    type="userID"
                    value={credentials.userID}
                    onChange={handleInputChange}
                    name="userID"
                    id="userID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="name"
                    value={credentials.name}
                    onChange={handleInputChange}
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="confirmPassword"
                    name="confirmPassword"
                    value={credentials.password}
                    onChange={handleInputChange}
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                
                
                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
