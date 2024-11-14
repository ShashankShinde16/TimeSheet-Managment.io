import React, { useState, useEffect } from 'react';
import NavBar from './comman/NavBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from './comman/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RemoveFromProject = () => {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const userID  = location.state;
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const [projectNameFilter,setProjectNameFilter] = useState('');
    const [projectIdFilter, setprojectIdFilter] = useState('');

    const filteredProjects = projects.filter((data) => {
        const matchesProjectID = data.projectID.toString().includes(projectIdFilter);
        const matchesProjectName = data.project.projectName.toLowerCase().includes(projectNameFilter.toLowerCase());
    
        return matchesProjectID && matchesProjectName;
    });

    const handleOnRemove = async (event, id) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/ProjectAssignedUserAPI/id?id=${id}`,
                {
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': '*/*'
                    }
                  });
                  if(response.data.statusCode == 204){
                    navigate("/admin/user-list");
                  }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                console.error('Error fetching data:', error);
            }
        }
    }
    

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ProjectAssignedUserAPI/PAUByUserId?id=${userID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                setProjects(response.data.result); // Update state with the fetched data
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

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <>
            <NavBar />
            <ToastContainer />
            <label htmlFor="projectId-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="projectId-search"
                    className="mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by project Id"
                    value={projectIdFilter}
                    onChange={(e) => setprojectIdFilter(e.target.value)} 
                />
            <label htmlFor="projectName-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="projectName-search"
                    className="mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Project Name"
                    value={projectNameFilter}
                    onChange={(e) => setProjectNameFilter(e.target.value)} 
                />
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Project ID</th>
                            <th scope="col" className="px-6 py-3">Project Name</th>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    {filteredProjects.map((data) => {
                        return (
                            <tbody key={data.projectID}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data.id}
                                    </td>
                                    <td className="px-6 py-4">
                                            {data.projectID}
                                    </td>
                                    <td className="px-6 py-4">
                                            {data.project.projectName}
                                    </td>
                                    <td className="px-6 py-4">
                                            {data.user.userID}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link onClick={(event) => handleOnRemove(event,data.id)}
                                            className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</Link>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
            <Footer />
        </>
    );
}

export default RemoveFromProject;
