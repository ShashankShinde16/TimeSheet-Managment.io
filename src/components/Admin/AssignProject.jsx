import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchFilter from '../common/SearchFilter';

const AssignProject = () => {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const { userID, projectDTO}  = location.state;
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const [projectNameFilter,setProjectNameFilter] = useState('');
    const [projectIdFilter, setProjectIdFilter] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);

    const handleSearchFeature = () => {
        const filteredProjects = projects.filter((project) => {
            const matchesProjectID = project.projectID.toString().includes(projectIdFilter);
            const matchesProjectName = project.name.toLowerCase().includes(projectNameFilter.toLowerCase());
    
            return matchesProjectID && matchesProjectName;
        });
        setFilteredProjects(filteredProjects);
    }

    const handleOnAssign = async (event, projectID) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ProjectAssignedUserAPI/CreateProjectAssignedUser`,
                {projectID,userID}, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': '*/*'
                    }
                  });
                  if(response.data.statusCode == 201){
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
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ProjectAPI`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                setFilteredProjects(response.data.result);
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
            <SearchFilter
                projectIdFilter={projectIdFilter}
                projectNameFilter={projectNameFilter}
                setProjectIdFilter={setProjectIdFilter}
                setProjectNameFilter={setProjectNameFilter}
                handleSearchFeature={handleSearchFeature}/>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Project ID</th>
                            <th scope="col" className="px-6 py-3">Project Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Users</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    {filteredProjects.map((project) => {
                        return (
                            <tbody key={project.projectID}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {project.projectID}
                                    </th>
                                    <td className="px-6 py-4">
                                            {project.name}
                                    </td>
                                    <td className="px-6 py-4">
                                            {project.description}
                                    </td>
                                    <td className="px-6 py-4">
                                            {project.status}
                                    </td>
                                    <td className="px-6 py-4">
                                            {project.users}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link onClick={(event) => handleOnAssign(event,project.projectID)}
                                            className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Assign</Link>
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

export default AssignProject;
