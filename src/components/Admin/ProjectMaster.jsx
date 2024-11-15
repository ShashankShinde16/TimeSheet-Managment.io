import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowToast, selectToken, setShowToast } from '../../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-GB').split('T')[0];
  };

const ProjectMaster = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const showToast = useSelector(selectShowToast);
    const dispatch = useDispatch();
    const [projectNameFilter, setProjectNameFilter] = useState('');
    const [projectIdFilter, setprojectIdFilter] = useState('');
    const [refresh, setRefresh] = useState(false);


    const filteredProjects = projects.filter((project) => {
        const matchesProjectID = project.projectID.toString().includes(projectIdFilter);
        const matchesProjectName = project.name.toLowerCase().includes(projectNameFilter.toLowerCase());

        return matchesProjectID && matchesProjectName;
    });


    useEffect(() => {

        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ProjectAPI`, {
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
    }, [refresh]); // Trigger re-fetch whenever `refresh` changes

    const handleOnDelete = (event, projectID) => {
        event.preventDefault();

        // Show a custom toast with Yes/No buttons
        const confirmDelete = toast(
            <div>
                <p>Are you sure you want to delete this project?</p>
                <div>
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/ProjectAPI/id?id=${projectID}`);
                                toast.success('Project deleted successfully!', {
                                    autoClose: 1500,
                                    hideProgressBar: false,
                                });

                                setTimeout(() => {
                                    setRefresh((prev) => !prev);
                                }, 1500);

                            } catch (error) {
                                toast.error(`Error: ${error.response?.data?.errorMesseges || 'Something went wrong'}`);
                            }
                            toast.dismiss(confirmDelete); // Dismiss the confirmation toast after action
                        }}
                        className="bg-red-600 text-white px-3 py-1 mr-2 rounded"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(confirmDelete)} // Dismiss the toast if canceled
                        className="bg-gray-600 text-white px-3 py-1 rounded"
                    >
                        No, Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false, // Don't auto-close, until user interacts
                closeOnClick: false, // Prevent closing by clicking outside
                draggable: false,
                hideProgressBar: true,
            }
        );
    };

    useEffect(() => {
        const fetchData = () => {
            if (showToast) {
                toast.success(`Welcome to the admin panel`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                });

                // Reset showToast state after displaying the toast
                dispatch(setShowToast(false));
            }
        }

        fetchData();
    }, [showToast]);



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
                            <th scope="col" className="px-6 py-3">Project ID</th>
                            <th scope="col" className="px-6 py-3">Project Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Users</th>
                            <th scope="col" className="px-6 py-3">Create Date / Update Date</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    {filteredProjects.map((project) => {
                        return (
                            <tbody key={project.projectID}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.projectID}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.description}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.status}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"User"}>
                                            {project.users}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {formatDate(project.createDate)+" / "+formatDate(project.updateDate)}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to='/admin/project-detail/update-project'
                                            state={project}
                                            className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        <Link
                                            onClick={(event) => handleOnDelete(event, project.projectID)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
                <div className="z-50 fixed bottom-16 right-10">
                    <Link to={`/admin/add-project`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-3xl shadow-lg">
                        Add Project
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProjectMaster;
