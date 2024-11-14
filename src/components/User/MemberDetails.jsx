import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../comman/Footer';
import NavBar from '../comman/NavBar';

const MemberDetails = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const projectID = location.state; 

    useEffect(() => {
        const source = axios.CancelToken.source(); 

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAssignedUserAPI/PAUByProjectId?id=${projectID}`, {
                    cancelToken: source.token, 
                });
                console.log(response);
                setUsers(response.data.result);   
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();

        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, []);  

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            
            <div className="max-w-7xl mx-auto px-4 py-12">
                <ToastContainer />
                
                <h2 className="mb-8 text-3xl font-extrabold text-gray-900 dark:text-white">
                    Team Members
                </h2>
                
                {/* Container for the user list */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <ul className="space-y-4">
                        {users.map((data) => (
                            <li key={data.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>

                                <div className="flex-1">
                                    <span className="text-lg font-semibold text-gray-800">{data.user.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default MemberDetails;
