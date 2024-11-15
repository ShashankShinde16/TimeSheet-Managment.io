import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { login, SET_JwtToken, SET_Role, setShowToast } from "../../features/userSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Handle the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordState = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  // Handle form submission
  const handleOnClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/UserAuth/Login`,
        credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      if (response.data.statusCode == 200) {
        // Dispatch login action with fetched data
        dispatch(login({
          name: response.data.result.user.name,
          id: response.data.result.user.userID,
          isLoggedIn: true
        }));
        if(response.data.result.user.roleID == import.meta.env.VITE_ADMIN){
          dispatch(SET_Role("Admin"));
        }else{
          dispatch(SET_Role("User"));
        }

        dispatch(SET_JwtToken(response.data.result.token));
        if(response.data.result.token){
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.result.token}`;
        }
        dispatch(setShowToast(true));
          // Navigate based on role
        if (response.data.result.user.roleID === 1) {
          navigate("/admin/projects-list");
        } else if (response.data.result.user.roleID === 2) {
          navigate("/user/projects-list");
        }
      }
    } catch (error) {
      toast.error(`Login Failed: ${error.response.data.errorMesseges}`, {
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div>
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
                  <div className=" relative flex items-center justify-center">
                  <input
                    type={showPassword ? "text": "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {showPassword ? 
                  <svg onClick={handlePasswordState} className="absolute right-2" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>
                  :
                  <svg onClick={handlePasswordState} className="absolute right-2" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                }
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium roundedLg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
