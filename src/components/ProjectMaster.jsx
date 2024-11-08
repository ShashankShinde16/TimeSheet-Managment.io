import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

const ProjectMaster = () => {
    const[projects, setProjects] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks
      
        const fetchData = async () => {
          try {
            const response = await axios.get('https://localhost:7208/api/ProjectAPI', {
              cancelToken: source.token, // Pass the cancel token with the request
            });
            console.log(response.data);
            setProjects(response.data.result);
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
      }, []); // Empty dependency array means this effect runs only once


    return (
        <>
            <NavBar />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                            Project ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Create Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Update Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {projects.map((project) => {
                        return(
                            <tbody key={project.projectID}>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link to={`/admin/project-detail/{id:5}`}>
                                {project.projectID}
                            </Link>
                            </th>
                            <td className="px-6 py-4">
                            <Link to={`/admin/project-detail/{id:5}`}>
                                {project.description}
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                            <Link to={`/admin/project-detail/{id:5}`}>
                                {project.name}
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                            <Link to={`/admin/project-detail/{id:5}`}>
                                {project.status}
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                            <Link to={`/admin/project-detail/{id:5}`}>
                                12/09/2024
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                            <Link to={`/admin/project-detail/{id:5}`}>
                                03/11/2024
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                                <Link to="/admin/edit-project" className=" mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <Link to="/admin/delete-project" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                            </td>
                        </tr>
                    </tbody>
                        )})}
                </table>
            </div>
            <Footer />
        </>
    )
}

export default ProjectMaster;