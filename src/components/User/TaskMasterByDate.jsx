import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { useSelector } from 'react-redux'
import { selectName, selectToken } from "../../features/userSlice";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const dateFormat = (data) => {
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(data);
    return date.toLocaleDateString("en-US", options);
}

const TaskMasterByDate = (params) => {
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const location = useLocation();
    const userName = useSelector(selectName);
    const { userID, projectID, projectName, timeOfLog } = location.state;
    const [userTasks, setUserTasks] = useState([]);



    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/TaskAPI/GetUserTasksByDate/${projectID}/${userID}?timeOfLog=${timeOfLog}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                console.log(response.data.result);
                setUserTasks(response.data.result);
            } catch (error) {
                console.log(error.message);
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
    }, []);

    return (
        <>
            <NavBar />
            <ToastContainer />
                <div className="flex pl-8 items-center py-4 text-xs text-gray-700 bg-gray-300 uppercase">
                    <ArrowBackIcon />
                    <Link to="/user/projects-list" className="mx-1 dark:text-blue-500 hover:underline"><h3>{userName}</h3></Link>
                    <h3>{"/"}</h3>
                    <Link to="/user/task-list" state={{userID:userID,projectID:projectID,projectName:projectName}} className="mx-1 dark:text-blue-500 hover:underline"><h3>{projectName}</h3></Link>
                    <h3>{"/ " + dateFormat(timeOfLog)}</h3>
                </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* <label htmlFor="projectId-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="projectId-search"
                    className="mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Task Id"
                    value={taskIdFilter}
                    onChange={(e) => setTaskIdFilter(e.target.value)}
                />
                <label htmlFor="projectName-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="projectName-search"
                    className="mx-auto my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Task description"
                    value={taskNameFilter}
                    onChange={(e) => setTaskNameFilter(e.target.value)}
                /> */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Duration (hours)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Log
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {
                        userTasks.map((task, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {task.taskDetails}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.duration}
                                        </td>
                                        <td className="px-6 py-4">
                                            {dateFormat(task.timeOfLog)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <Link
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
            <div className="z-50 fixed bottom-16 right-10">
                <Link to={`/user/add-task`} state={{ userID: userID, projectID: projectID }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                    Add New Task
                </Link>
            </div>
            <Footer />
        </>
    )
}


export default TaskMasterByDate;