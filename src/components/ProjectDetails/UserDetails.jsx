import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = (props) => {
    const [users, setUsers] = useState([]);
    const searchInputRef = useRef(null);

    // Fetch data when the component mounts
    useEffect(() => {
        const source = axios.CancelToken.source(); // Cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ProjectAssignedUserAPI/PAUByProjectId?id=${props.projectID}`, {
                    cancelToken: source.token, 
                });
                setUsers(response.data.result);   
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();

        // Cleanup function to cancel the request if the component unmounts
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [props.projectID]);  // Re-run effect if projectID changes

    const handleAddUser = async (e, data) => {
        e.preventDefault();

        try {
            // Send POST request to add user to the project
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ProjectAssignedUserAPI/CreateProjectAssignedUser`,
                {
                    "projectID": props.projectID,
                    "userID": data.userID
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            // Update users and noProjects in state immediately after the user is added
            setUsers((prevUsers) => [...prevUsers, { user: data }]);
            setNoProjects((prevNoProjects) => prevNoProjects.filter((user) => user.userID !== data.userID));
            setSearch('');  // Clear search
            setFilter([]);  // Clear suggestions
        } catch (error) {
            toast.error(`Error : ${error.response.data.errorMesseges}`, {
                autoClose: 5000,
                hideProgressBar: false,
              });
        }
    };

    const handleOnDelete = async (e, data) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/ProjectAssignedUserAPI/id?id=${data.id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data.id)); // Remove from users
            setNoProjects((prevNoProjects) => [...prevNoProjects, data.user]); // Add back to noProjects
        } catch (error) {
            toast.error(`Error : ${error.response.data.errorMesseges}`, {
                autoClose: 5000,
                hideProgressBar: false,
              });
        }
    };

    const handleDuration = async (e, data) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/TaskAPI/GetWorkingHoursByUser/${props.projectID}/${data.user.userID}`);

                toast.success(`Duration : ${(response.data.result).toFixed(2)} hours`, {
                    autoClose: 2000,
                    hideProgressBar: false,
                });

        } catch (error) {
            toast.success(`Duration : ${error.response.data.errorMesseges}`, {
                autoClose: 5000,
                hideProgressBar: false,
              });
        }
    };

    // Close search suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setFilter([]); // Close suggestions if clicked outside
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full flex items-center justify-center'>
            <ToastContainer />
            <div>
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Users associated with this project
                </h2>
                {/* List of users associated with the project */}
                <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                    {users.map((data) => (
                        <li key={data.id} className="flex space-x-2 rtl:space-x-reverse items-center">
                            <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <div className='w-full flex gap-4'>
                                <span className="leading-tight">{data.user.name}</span>
                                <Link onClick={(event) => handleDuration(event, data)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Duration</Link>
                                <Link onClick={(event) => handleOnDelete(event, data)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserDetails;
