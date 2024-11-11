import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { login, selectRole, SET_JwtToken, SET_Role } from "../features/userSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  // To handle errors
  const [loading, setLoading] = useState(false);  // To manage loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectRole);

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

    // Set loading state to true when making request
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:7208/api/UserAuth/Login",
        credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      }
      );

      const role = await axios.get(
        `https://localhost:7208/api/UserAPI/id?id=${response.data.result.user.userID}`
      );

      if (response.data && response.data.result) {
        // Dispatch login action with fetched data
        dispatch(login({
          name: response.data.result.user.name,
          id: response.data.result.user.userID,
          isLoggedIn: true
        }));
        dispatch(SET_Role(role.data.result.roleMaster.role));
        dispatch(SET_JwtToken(response.data.result.token));
        console.log(response.data.result.user);
        if (role.data.result.roleMaster.role == "Admin") {
          navigate("/admin/projects-list");
        } else if (role.data.result.roleMaster.role == "User") {
          navigate("/user/task-list");
        }
      } else {
        setError("Invalid credentials. Please try again.");
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
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
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
                <div className="flex items-center justify-between">
                  
                  <Link
                    to={"/reset-password"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

// <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//   Don’t have an account yet?{" "}
//   <Link
//     to="/signup"
//     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//   >
//     Sign up
//   </Link>
// </p>