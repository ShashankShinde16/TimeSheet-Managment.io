import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const NavBar = () => {
  // State to control dropdown visibility for main menu and the "Developer with no project" dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle the main menu (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle the "Developer with no project" dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = async (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/");
  }

  useEffect(() => {
    const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks
  
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7208/api/UserAPI/GetUserNoProjectAssigned', {
          cancelToken: source.token, // Pass the cancel token with the request
        });
        console.log(response.data);
        setUsers(response.data.result);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  
    // Cleanup function to cancel the request if the component unmounts
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []); // Empty dependency array means this effect runs only once
  

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TimeSheet
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}  // Toggle the mobile menu
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "block" : "hidden"}`} // Toggle based on state
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li className="flex items-center">
              <Link
                to={`/admin/add-user`}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Add User
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to={`/admin/add-project`}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Add Project
              </Link>
            </li>

            {/* Developer with no project dropdown */}
            <li className="relative">
              <button
                onClick={toggleDropdown}  // Toggle dropdown visibility
                className="flex items-center justify-between w-full h-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Developer with no project
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  id="dropdownNavbar"
                  className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  style={{ top: "100%", left: "0" }}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    {users.map((user) => {
                        return (
                            <li key={user.userID}>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                {user.name}
                            </a>
                        </li>
                        )
                    })}                    
                  </ul>
                </div>
              )}
            </li>

            {/* Signout button */}
            <li className="flex items-center">
              <Link
                onClick={handleSignOut}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Signout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
