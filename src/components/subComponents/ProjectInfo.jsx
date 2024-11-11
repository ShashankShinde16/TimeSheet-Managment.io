import { React, useEffect, useState } from 'react'
import axios from 'axios';

const ProjectInfo = (props) => {
    const[project, setProject] = useState({});

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAPI/id?id=${props.projectID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                console.log(response.data);
                setProject(response.data.result);
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
    }, []);


    return (
        <div className='w-full flex flex-col items-center justify-between'>
            <p
                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
                Project ID : {project.projectID}
                <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
            </p>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {project.name}
            </h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">
                {project.description}
            </p>
        </div>
    )
}

export default ProjectInfo;