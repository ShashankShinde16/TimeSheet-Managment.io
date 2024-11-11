import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector } from 'react-redux'
import { selectRole, selectToken } from "../features/userSlice";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskMaster = (params) => {
  const token = useSelector(selectToken);
  const {id:userId} = useParams(params.id);
  const userRole = useSelector(selectRole);
  const [task, setTask] = useState({
      userID : userId,
      projectID : "",
      taskDetails : "",
      duration : ""
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({
          ...prevState,
          [name]: value
        }));
    };
    
    const handleOnClick = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(
                "https://localhost:7208/api/TaskAPI",
                task,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                }
            );    
            console.log(response.data.result);
            if (response.data && response.data.result) {
                if(userRole == "Admin"){
                    navigate("/admin/projects-list");
                }else if(userRole == "User"){
                            navigate("/user/task-list");
                        }
                    } else {
                        setError("Invalid details. Please try again.");
                    }
                } catch (error) {
                    toast.error(`Error : ${error.response.data.errorMesseges}`, {
                        autoClose: 5000,
                        hideProgressBar: false,
                      });
                }
            }
            
              useEffect(() => {
                if (!token) {
                  navigate("/");
                }
              }, []);
            
            return (
                <>
            <NavBar />
            {/* Toast Container */}
      <ToastContainer />
            <div className="flex items-center justify-center w-full mt-10">
                <form className="w-full mx-6" onSubmit={(event) => handleOnClick(event)}>
                    <div className="mb-5">
                        <label htmlFor="userID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
                        <input 
                        readOnly
                        type="text" 
                        id="userID" 
                        value={task.userID}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="ProjectID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project ID</label>
                        <input 
                        type="text" 
                        id="projectID" 
                        name="projectID" 
                        value={task.projectID}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-5">
                    <label htmlFor="taskDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Detail</label>
                    <textarea 
                    id="taskDetails"
                    name="taskDetails"  
                    rows="2" 
                    value={task.taskDetails}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="task describe..."></textarea>
                    </div>
                    <div className="mb-5">
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                    <input 
                    id="duration"
                    name="duration"
                    value={task.duration}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="task duration..." />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add project</button>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default TaskMaster;