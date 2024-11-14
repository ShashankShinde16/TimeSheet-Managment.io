import React, { useState, useEffect } from "react";
import NavBar from "../comman/NavBar";
import Footer from "../comman/Footer";
import Task from "../ProjectDetails/Task";
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/userSlice'
import ProjectInfo from "../ProjectDetails/projectInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserDetails from "../ProjectDetails/UserDetails";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDetails = (params) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const location = useLocation();
  const tab  = location.state;
 console.log(tab);
  const {id:projectID} = useParams(params.id);
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(tab);
  
  // Function to handle tab switching
  const handleTabClick = (tab) => {
      setActiveTab(tab);
    };


    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, []);

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <ul className="flex justify-around text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" role="tablist">
                    <li className="me-2">
                        <button
                            id="project-tab"
                            type="button"
                            role="tab"
                            aria-controls="project"
                            aria-selected={activeTab === "project"}
                            onClick={() => handleTabClick("project")}
                            className={`inline-block p-4 ${activeTab === "project" ? "text-blue-600 dark:text-blue-500" : "text-gray-500"} rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700`}>
                            Project Details
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            id="User-tab"
                            type="button"
                            role="tab"
                            aria-controls="User"
                            aria-selected={activeTab === "User"}
                            onClick={() => handleTabClick("User")}
                            className={`inline-block p-4 ${activeTab === "User" ? "text-blue-600 dark:text-blue-500" : "text-gray-500"} hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>
                            User Details
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            id="task-tab"
                            type="button"
                            role="tab"
                            aria-controls="task"
                            aria-selected={activeTab === "task"}
                            onClick={() => handleTabClick("task")}
                            className={`inline-block p-4 ${activeTab === "task" ? "text-blue-600 dark:text-blue-500" : "text-gray-500"} hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>
                            Task Details
                        </button>
                    </li>
                </ul>

                <div id="defaultTabContent">
                    <div
                        className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${activeTab === "project" ? "" : "hidden"}`}
                        id="project"
                        role="tabpanel"
                        aria-labelledby="project-tab"
                    >
                        <ProjectInfo projectID={projectID}/>
                    </div>

                    <div
                        className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${activeTab === "User" ? "" : "hidden"}`}
                        id="User"
                        role="tabpanel"
                        aria-labelledby="User-tab"
                    >
                        <UserDetails projectID={projectID}/>
                    </div>

                    <div
                        className={`p-4 bg-white rounded-lg md:p-4 dark:bg-gray-800 ${activeTab === "task" ? "" : "hidden"}`}
                        id="task"
                        role="tabpanel"
                        aria-labelledby="task-tab"
                    >
                        <Task projectID={projectID}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetails;
