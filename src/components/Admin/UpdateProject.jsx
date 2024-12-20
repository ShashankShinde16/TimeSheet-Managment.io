import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/userSlice'
import Footer from "../common/Footer";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (datetime) => {
  const date = new Date(datetime);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
};

const UpdateProject = (props) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const location = useLocation();
  const { projectID, name, description, updateDate, status } = location.state;
  const [project, setProject] = useState({
    projectID: projectID,
    name: name,
    description: description,
    updateDate: formatDate(updateDate),
    status: status
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
        `${import.meta.env.VITE_BASE_URL}/api/ProjectAPI/id?id=${projectID}`,
        project,{
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        }
      );
      if (response.status == 200) {
        toast.success(`successfully updated the project`, {
          autoClose: 1000,
          hideProgressBar: false,
        });
        setTimeout(()=>{
          navigate("/admin/projects-list");
        },1000);
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
      <div className="flex items-center justify-center w-full mt-2">
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

          <label htmlFor="updateDate" className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">update date</label>
          <input
            type="date"
            id="updateDate"
            name="updateDate"
            value={project.updateDate}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <label htmlFor="status" className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">Project Status</label>
          <select
            id="status"
            name="status"
            value={project.status}
            onChange={handleInputChange}
            required
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select status</option>
            <option value="Yet To Start">Yet To Start</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="On Hold">On Hold</option>
          </select>

          <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update project</button>
        </form>
      </div>
      <Footer />
    </>
  )
}


export default UpdateProject;