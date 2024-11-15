import { useState, useEffect } from "react";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
    const [users, setUsers] = useState([]);
    const [userNameFilter, setUserNameFilter] = useState('');
    const [userIdFilter, setUserIdFilter] = useState('');


    const filteredusers = users.filter((user) => {
        const matchesUserID = user.userID.toString().includes(userIdFilter);
        const matchesUserName = user.name.toLowerCase().includes(userNameFilter.toLowerCase());

        return matchesUserID && matchesUserName;
    });


    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/UserAPI`, {
                    cancelToken: source.token,
                });
                console.log(response.data.result);
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

        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, []);

    const handleOnDelete = (event, userID) => {
        event.preventDefault();

        // Create confirmation toast with actions
        const confirmDelete = toast(
            <div>
                <p>Are you sure you want to delete this user?</p>
                <div>
                    <button
                        onClick={async () => {
                            try {
                                // Start the delete request
                                await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/UserAPI/id?id=${userID}`);

                                // On success, remove the user locally and show success toast
                                setUsers((prevUsers) => prevUsers.filter(user => user.userID !== userID));
                                toast.success('User deleted successfully!', {
                                    autoClose: 500,
                                    hideProgressBar: false,
                                });

                            } catch (error) {
                                toast.error(`Error: ${error.response?.data?.errorMesseges || 'Something went wrong'}`, {
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                });
                            }
                            // Dismiss the confirmation toast
                            toast.dismiss(confirmDelete);
                        }}
                        className="bg-red-600 text-white px-3 py-1 mr-2 rounded"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(confirmDelete)}  // Dismiss if canceled
                        className="bg-gray-600 text-white px-3 py-1 rounded"
                    >
                        No, Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false, // Don't auto-close until user interacts
                closeOnClick: false, // Prevent clicking outside
                draggable: false,
                hideProgressBar: true,
            }
        );
    };

    return (
        <div>
            <NavBar />
            <ToastContainer />
            <label htmlFor="projectId-search" className="sr-only">Search</label>
            <input
                type="text"
                id="projectId-search"
                className="mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by project Id"
                value={userIdFilter}
                onChange={(e) => setUserIdFilter(e.target.value)}
            />
            <label htmlFor="projectName-search" className="sr-only">Search</label>
            <input
                type="text"
                id="projectName-search"
                className="mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Project Name"
                value={userNameFilter}
                onChange={(e) => setUserNameFilter(e.target.value)}
            />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Project Assign
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {filteredusers.map((user) => (
                        <tbody key={user.userID}>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.userID}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {Array.isArray(user.projectDTO) && user.projectDTO.length > 0 ? (
                                        user.projectDTO.map((project, index) => (
                                            <div key={index}>
                                                {project.projectName}
                                            </div>
                                        ))
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center flex flex-col justify-center md:flex-row">
                                    <Link to='/admin/user/assign-project'
                                        state={{userID: user.userID, projectDTO: user.projectDTO}}
                                        className=" mr-3 font-medium text-green-600 dark:text-green-500 hover:underline">Assign Project</Link>
                                    <Link to='/admin/user/remove-from-project'
                                        state={user.userID}
                                        className=" mr-3 font-medium text-orange-600 dark:text-orange-500 hover:underline">Remove From Project</Link>
                                    <Link onClick={(event) => handleOnDelete(event, user.userID)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>

                <div className="z-50 fixed bottom-16 right-10">
                    <Link to={`/admin/add-user`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-3xl shadow-lg">
                        Add user
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
export default User;
