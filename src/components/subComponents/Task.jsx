import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectId } from '../../features/userSlice';

const Task = (props) => {
    const [tasks, setTasks] = useState([]);
    const userID = useSelector(selectId);

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create a cancel token to prevent memory leaks

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7208/api/ProjectAPI/tasks/id?id=${props.projectID}`, {
                    cancelToken: source.token, // Pass the cancel token with the request
                });
                console.log(response.data);
                setTasks(response.data.result);
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            user Name
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
                    tasks.map((task) => {
                        return (
                            <tbody key={task.taskID}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {task.user.userID}
                                    </th>
                                    <td className="px-6 py-4">
                                            {task.user.name}
                                    </td>
                                    <td className="px-6 py-4">
                                            {task.taskID}
                                    </td>
                                    <td className="px-6 py-4">
                                            {task.taskDetails}
                                    </td>
                                    <td className="px-6 py-4">
                                            {task.duration}
                                    </td>
                                    <td className="px-6 py-4">
                                            {task.timeOfLog}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    );
}

export default Task;