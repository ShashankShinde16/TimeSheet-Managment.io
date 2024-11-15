import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { useSelector } from 'react-redux'
import { selectToken } from "../../features/userSlice";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskMaster = () => {
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const location = useLocation();
    const {projectID, userID} = location.state; 
    const [userTasks, setUserTasks] = useState([]);
    const [taskNameFilter,setTaskNameFilter] = useState('');
    const [taskIdFilter, setTaskIdFilter] = useState('');

    const filteredTasks = userTasks.filter((data) => {
        const matchestaskID = data.taskID.toString().includes(taskIdFilter);
        const matchestaskName = data.taskDetails.toLowerCase().includes(taskNameFilter.toLowerCase());
    
        return matchestaskID && matchestaskName;
    });

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/TaskAPI/GetUserTasks/${projectID}/${userID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                  });
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <label htmlFor="projectId-search" className="sr-only">Search</label>
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
                />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                                S.no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Project ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Duration (hours)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Log
                            </th>
                        </tr>
                    </thead>
                    {
                        filteredTasks.map((task,index) => {
                            return (
                                <tbody key={task.taskID}>
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index+1}
                                        </th>
                                        <td className="px-6 py-4">
                                                {task.project.projectID}
                                        </td>
                                        <td className="px-6 py-4">
                                                {task.project.projectName}
                                        </td>
                                        <td className="px-6 py-4">
                                                {task.taskID}
                                        </td>
                                        <td className="px-6 py-4">
                                                {task.taskDetails}
                                        </td>
                                        <td className="px-6 py-4">
                                                {task.duration}
                                        </td>
                                        <td className="px-6 py-4">
                                                {task.timeOfLog}
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
            <div className="z-50 fixed bottom-16 right-10">
                <Link to={`/user/add-task`} state={{userID:userID,projectID:projectID}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                    Add New Task
                </Link>
            </div>
            <Footer />
        </>
    )
}


export default TaskMaster;