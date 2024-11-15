import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/icon.svg"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectRole, SET_JwtToken } from "../../features/userSlice";
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  // State to control dropdown visibility for main menu and the "Developer with no project" dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(selectRole);

  // Toggle the main menu (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle the "Developer with no project" dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    if (role == "Admin") {
      navigate("/admin/projects-list");
    }else{
      navigate("/user/projects-list");
    }
  }

  const handleSignOut = async (event) => {
    event.preventDefault();
    dispatch(SET_JwtToken(null));
    dispatch(logout());
    navigate("/", { replace: true });
  }


  return (
    <nav className="bg-gray-400 border-gray-200 dark:bg-gray-900 dark:border-gray-700">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <Link onClick={handleLogoClick} className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
        <img src={Logo} alt="logo" width="18px" height="18px" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            TimeSheet
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}  // Toggle the mobile menu
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {(role == "Admin") &&
              <li className="flex items-center">
                <Link
                  to={`/admin/user-list`}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-gray-400 md:hover:bg-transparent md:border-0 md:hover:bg-gray-100 md:hover:text-gray-400 md:p-2 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Users
                </Link>
              </li>
            }

            {/* Signout button */}
            <li className="flex items-center">
              <Link
                onClick={handleSignOut}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-gray-400 md:hover:bg-transparent md:border-0 md:hover:bg-gray-100 md:hover:text-gray-400 md:p-2 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
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
