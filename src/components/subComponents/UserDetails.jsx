import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = (props) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [noProjects, setNoProjects] = useState([]);
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    // Handle search input change
    const handleSearchChange = async (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);
        searches(value);
    };

    // Function to filter users based on search query
    const searches = (value) => {
        if (value.length > 0) {
            const user = noProjects.filter((suggest) => {
                return suggest.name.toLowerCase().includes(value.toLowerCase());
            });
            setFilter(user);
        } else {
            setFilter(noProjects);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        const source = axios.CancelToken.source(); // Cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAssignedUserAPI/PAUById?id=${props.projectID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                const usersWithNoProjects = await axios.get('https://localhost:7208/api/UserAPI/GetUserNoProjectAssigned', {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                console.log(response.data);  // Log project user details
                console.log(usersWithNoProjects.data);  // Log users with no projects
                setUsers(response.data.result);  // Set users assigned to the project
                setNoProjects(usersWithNoProjects.data.result);  // Set users without projects
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
            const response = await axios.post(`https://localhost:7208/api/ProjectAssignedUserAPI/CreateProjectAssignedUser`,
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
            const response = await axios.delete(`https://localhost:7208/api/ProjectAssignedUserAPI/id?id=${data.id}`);
            console.log(response);
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
            const response = await axios.get(`https://localhost:7208/api/TaskAPI/GetWorkingHoursByUser/${props.projectID}/${data.user.userID}`);

                toast.success(`Duration : ${response.data.result}`, {
                    autoClose: 5000,
                    hideProgressBar: false,
                });

        } catch (error) {
            toast.error(`Error : ${error.response.data.errorMesseges}`, {
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
        <div className='w-full flex items-center justify-around'>
            {/* Toast Container */}
            <ToastContainer />

            <div>
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Users who are associated with this project
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

            <div>
                <form className="flex items-center justify-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full" ref={searchInputRef}>
                        <input
                            onChange={handleSearchChange}
                            value={search}
                            type="text"
                            id="simple-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search user name..."
                            required
                        />
                        {filter.length > 0 && (
                            <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                {filter.map((data, index) => (
                                    <Link key={index} onClick={(event) => handleAddUser(event, data)}>
                                        <li className="px-4 py-2 text-gray-700 hover:bg-blue-100">
                                            {data.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
