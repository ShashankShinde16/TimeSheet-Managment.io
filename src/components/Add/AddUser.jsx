import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/userSlice'
import Footer from "../common/Footer";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import generatePassword from "../Password/GenratePassword";

const AddUser = () => {
    const token = useSelector(selectToken);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: generatePassword(8)

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
                `${import.meta.env.VITE_BASE_URL}/api/UserAPI`,
                user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }
            );
            toast.success(`User added successfully`, {
                autoClose: 1000,
                hideProgressBar: false,
              });
              setTimeout(()=>{
                navigate("/admin/user-list");
              },1000);
        } catch (error) {
            toast.error(`Error : ${error.response.data.errorMessage}`, {
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
            <ToastContainer />
            <form onSubmit={(event) => handleOnClick(event)} className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add new account
                            </h1>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            value={user.name}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required/>
                                    </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="text"
                                        name="text"
                                        id="password"
                                        value={user.password}
                                        readOnly
                                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
                        </div>
                    </div>
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default AddUser;