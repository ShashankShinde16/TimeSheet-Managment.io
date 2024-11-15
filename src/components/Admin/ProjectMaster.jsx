import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowToast, selectToken, setShowToast } from '../../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchFilter from '../common/SearchFilter';
import AdminTable from '../Tables/AdminTable';

const ProjectMaster = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const showToast = useSelector(selectShowToast);
    const dispatch = useDispatch();
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projectIdFilter, setProjectIdFilter] = useState('');
    const [projectNameFilter, setProjectNameFilter] = useState('');
    const [refresh, setRefresh] = useState(false);


    const handleSearchFeature = () => {
        const filteredProjects = projects.filter((project) => {
            const matchesProjectID = project.projectID.toString().includes(projectIdFilter);
            const matchesProjectName = project.name.toLowerCase().includes(projectNameFilter.toLowerCase());
    
            return matchesProjectID && matchesProjectName;
        });
        setFilteredProjects(filteredProjects);
    }

    const handleRefresh = (value) => {
        setRefresh(value);
    }


    useEffect(() => {

        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ProjectAPI`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                setProjects(response.data.result); 
                setFilteredProjects(response.data.result);
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
    }, [refresh,projectIdFilter,projectNameFilter]);

    useEffect(() => {
        const fetchData = () => {
            if (showToast) {
                toast.success(`Welcome to the admin panel`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                });

                // Reset showToast state after displaying the toast
                dispatch(setShowToast(false));
            }
        }

        fetchData();
    }, [showToast]);



    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <>
            <NavBar />
            <ToastContainer />
            <SearchFilter 
                projectIdFilter={projectIdFilter}
                projectNameFilter={projectNameFilter}
                setProjectIdFilter={setProjectIdFilter}
                setProjectNameFilter={setProjectNameFilter}
                handleSearchFeature={handleSearchFeature}/>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                <AdminTable filteredProjects={filteredProjects} onChange={handleRefresh} />
                <div className="z-50 fixed bottom-16 right-10">
                    <Link to={`/admin/add-project`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-3xl shadow-lg">
                        Add Project
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProjectMaster;
