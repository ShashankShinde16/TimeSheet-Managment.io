import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from 'react-redux'
import { selectToken } from '../features/userSlice'
import Footer from "./Footer";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProject = (props) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const location = useLocation();
  const { projectID, name, description } = location.state;
  const [project, setProject] = useState({
    projectID: projectID,
    name: name,
    description: description
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://localhost:7208/api/ProjectAPI/id?id=${projectID}`,
        project, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      }
      );
      if (response.status == 200) {
        navigate("/admin/projects-list");
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
        <form className="w-full mx-6" onSubmit={handleOnClick}>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
          <textarea
            id="name"
            name="name"
            value={project.name}
            onChange={handleInputChange}
            rows="2"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="describe the project..."></textarea>
          <label htmlFor="description" className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={project.description}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="describe the project..."></textarea>
          <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update project</button>
        </form>
      </div>
      <Footer />
    </>
  )
}


export default UpdateProject;