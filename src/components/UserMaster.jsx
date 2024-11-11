import { React, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectId, selectToken} from '../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserMaster = () => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const [userProjects, setUserProjects] = useState([]);
  const userID = useSelector(selectId);
  useEffect(() => {
      const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks
      
      const fetchData = async () => {
          try {
              const response = await axios.get(`https://localhost:7208/api/TaskAPI/id?id=${userID}`, {
                  cancelToken: source.token, // Pass the cancel token with the request
                });
                console.log(response.data);
                setUserProjects(response.data.result);
            } catch (error) {
                toast.error(`Error : ${error.response.data.errorMesseges}`, {
                    autoClose: 5000,
                    hideProgressBar: false,
                  });
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
            {/* Toast Container */}
            <ToastContainer />
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
                        userProjects.map((task) => {
                            return (
                                <tbody key={task.taskID}>
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Link to={`/user/project-detail/{id:5}`}>
                                                {task.project.projectID}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            <Link to={`/user/project-detail/{id:5}`}>
                                                {task.project.projectName}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/user/project-detail/{id:5}`}>
                                                {task.taskID}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/user/project-detail/{id:5}`}>
                                                {task.taskDetails}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/user/project-detail/{id:5}`}>
                                                {task.duration}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/user/project-detail/{id:5}`}>
                                                {task.timeOfLog}
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
                <Link to={`/user/project-detail/${userID}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                    +
                </Link>
            </div>
            <Footer />
        </>
    )
}

export default UserMaster;