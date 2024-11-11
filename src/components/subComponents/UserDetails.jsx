import { React, useEffect, useState } from 'react'
import axios from 'axios';

const UserDetails = (props) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState();
    const [noProjects,setNoProjects] = useState([]);

    const handleSearchChange = async (e) => {
        e.preventDefault();
        const value = e.target.value;
    }

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAPI/users/id?id=${props.projectID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                const usersWithNoprojects = await axios.get('https://localhost:7208/api/UserAPI/GetUserNoProjectAssigned', {
                    cancelToken: source.token, // Pass the cancel token with the request
                  });
                console.log(response.data);
                console.log(usersWithNoprojects.data);
                setUsers(response.data.result);
                setNoProjects(usersWithNoprojects.data.result);
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
    }, []);


    return (
        <div className='w-full flex items-center justify-around'>
            <div>
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    users who are associated with this project
                </h2>
                {/* List of user */}
                <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                    {users.map((user) => {
                        return (
                            <li key={user.userID} className="flex space-x-2 rtl:space-x-reverse items-center">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="leading-tight">{user.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>

                <form className="flex items-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input onChange={handleSearchChange} value={search} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user name..." required />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default UserDetails;