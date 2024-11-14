import { React, useEffect, useState } from 'react'
import NavBar from '../comman/NavBar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../comman/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectId, selectShowToast, selectToken, setShowToast} from '../../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from '../User';

const UserMaster = () => {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const userID  = useSelector(selectId);
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const showToast = useSelector(selectShowToast);
    const dispatch = useDispatch();
    const [projectNameFilter,setProjectNameFilter] = useState('');
    const [projectIdFilter, setprojectIdFilter] = useState('');

    const filteredProjects = projects.filter((data) => {
        const matchesProjectID = data.projectID.toString().includes(projectIdFilter);
        const matchesProjectName = data.project.projectName.toLowerCase().includes(projectNameFilter.toLowerCase());
    
        return matchesProjectID && matchesProjectName;
    });

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAssignedUserAPI/PAUByUserId?id=${userID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                console.log(response.data.result);
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
        const fetchData = () => {
            if (showToast) {
                toast.success(`Welcome to the user panel`, {
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
    }, []);
    
    return (
        <>
            <NavBar />
            <ToastContainer />
            <label htmlFor="projectId-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="projectId-search"
                    className=" mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <th scope="col" className="px-6 py-3">Project Description</th>
                            <th scope="col" className="px-6 py-3">Team Members</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    {filteredProjects.map((data) => {
                        return (
                            <tbody key={data.projectID}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link to="/user/task-list" state={{userID:userID,projectID:data.projectID}}>
                                            {data.projectID}
                                    </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                    <Link to="/user/task-list" state={{userID:userID,projectID:data.projectID}}>
                                            {data.project.projectName}
                                    </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                    <Link to="/user/task-list" state={{userID:userID,projectID:data.projectID}}>
                                            {data.project.projectDescription}
                                    </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                            <Link to="/user/project-member-list" state={data.projectID}>
                                                {data.project.member}
                                            </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/user/add-task`} state={{userID:userID,projectID:data.projectID}}
                                            className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Add New Task</Link>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
            <Footer />
        </>
    )
}

export default UserMaster;