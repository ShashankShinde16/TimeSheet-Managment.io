import { React, useEffect, useState } from 'react'
import NavBar from '../common/NavBar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectId, selectShowToast, selectToken, setShowToast} from '../../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchFilter from '../common/SearchFilter';

const UserMaster = () => {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const userID  = useSelector(selectId);
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const showToast = useSelector(selectShowToast);
    const dispatch = useDispatch();
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projectNameFilter,setProjectNameFilter] = useState('');
    const [projectIdFilter, setProjectIdFilter] = useState('');


    const handleSearchFeature = () => {
        const filteredProjects = projects.filter((data) => {
            const matchesProjectID = data.projectID.toString().includes(projectIdFilter);
            const matchesProjectName = data.project.projectName.toLowerCase().includes(projectNameFilter.toLowerCase());
        
            return matchesProjectID && matchesProjectName;
        });
        setFilteredProjects(filteredProjects);
    }

    

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAssignedUserAPI/PAUByUserId?id=${userID}`, {
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
            <div className="flex pl-8 items-center py-4 text-xs text-gray-700 bg-gray-300 uppercase">
                    <Link onClick={() => setFilteredProjects(projects)} className="mx-1 text-base font-bold dark:text-blue-500 hover:underline"><h3>Projects</h3></Link>
                </div>
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
                                    <Link to="/user/task-list" state={{userID:userID,projectID:data.projectID,projectName:data.project.projectName}}>
                                            {data.projectID}
                                    </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                    <Link to="/user/task-list" state={{userID:userID,projectID:data.projectID,projectName:data.project.projectName}}>
                                            {data.project.projectName}
                                    </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                    <Link to="/user/task-list" state={{userID:userID,projectID:data.projectID,projectName:data.project.projectName}}>
                                            {data.project.projectDescription}
                                    </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                            <Link to="/user/project-member-list" state={data.projectID}>
                                                {data.project.member}
                                            </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/user/add-task`} state={{userID:userID,projectID:data.projectID,projectName:data.project.projectName}}
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