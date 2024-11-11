import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from 'react-redux'
import { selectToken } from '../features/userSlice'
import Footer from "./Footer";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const token = useSelector(selectToken);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        roleID: ""

    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOnClick = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "https://localhost:7208/api/UserAPI",
                user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }
            );
            console.log(response.data.result);
            if (response.data && response.data.result) {
                navigate("/admin/projects-list");
            } else {
                setError("Invalid details. Please try again.");
            }
        } catch (error) {
            toast.error(`Error : information is incomplete`, {
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
    }


    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);


    return (
        <div>
            <NavBar />
            {/* Toast Container */}
            <ToastContainer />
            <form onClick={handleOnClick} className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add new account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div className="flex gap-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            value={user.name}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="roleID" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">role ID</label>
                                        <input
                                            type="roleID"
                                            name="roleID"
                                            id="roleID"
                                            value={user.roleID}
                                            onChange={handleInputChange}
                                            placeholder="1 or 2"
                                            className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={user.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <button type="submit" className="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>

                            </form>
                        </div>
                    </div>
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default AddUser;