import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { useSelector } from 'react-redux'
import { selectRole, selectToken } from "../../features/userSlice";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  const token = useSelector(selectToken);
  const location = useLocation();
  const {userID, projectID} = location.state;
  const userRole = useSelector(selectRole);
  const [task, setTask] = useState({
      userID : userID,
      projectID : projectID,
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
            console.log(response.data);
            if(response.data.statusCode == 201){
                toast.success(`Task added successfully`, {
                    autoClose: 1500,
                    hideProgressBar: false,
                  });
                  setTimeout(()=>{
                      navigate(`/user/task-list`,{ state:{userID:userID,projectID:projectID}});  
                  },1500);
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
                        readOnly
                        type="text" 
                        id="projectID" 
                        name="projectID" 
                        value={task.projectID}
                        onChange={handleInputChange}
                        required
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
                    required
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="task describe..."></textarea>
                    </div>
                    <div className="mb-5">
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                    <input 
                    id="duration"
                    name="duration"
                    value={task.duration}
                    onChange={handleInputChange}
                    required
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="task duration..." />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default AddTask;