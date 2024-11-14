import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectId } from '../../features/userSlice';

const Task = (props) => {
    const [tasks, setTasks] = useState([]);
    const [userIdFilter, setUserIdFilter] = useState(""); // Filter for user ID
    const [userNameFilter, setUserNameFilter] = useState(""); // Filter for user name
    const [dateFilter, setDateFilter] = useState(""); // Filter for task log date
    const userID = useSelector(selectId);

    useEffect(() => {
        const source = axios.CancelToken.source(); 

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ProjectAPI/tasks/id?id=${props.projectID}`, {
                    cancelToken: source.token, 
                });
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

        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [props.projectID]); 

    const filteredTasks = tasks.filter((task) => {
        const userMatches = task.user.userID.toString().includes(userIdFilter) && task.user.name.toLowerCase().includes(userNameFilter.toLowerCase());

        // Check for date filter if it's set
        const dateMatches = dateFilter ? task.timeOfLog.slice(0, 10) === dateFilter : true; // Assuming `timeOfLog` is in 'YYYY-MM-DD' format

        return userMatches && dateMatches;
    });

    return (
        <div>
            <div className='flex justify-around gap-2'>
            <label htmlFor="userName-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="userName-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by user ID"
                    value={userIdFilter}
                    onChange={(e) => setUserIdFilter(e.target.value)} 
                />
                <label htmlFor="userId-search" className="sr-only">Search</label>
                <input
                    type="text"
                    id="userId-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by user name"
                    value={userNameFilter}
                    onChange={(e) => setUserNameFilter(e.target.value)} 
                />
                <label htmlFor="date-search" className="sr-only">Search</label>
                <input
                    type="date"
                    id="date-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)} 
                />
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                                S.no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Name
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
                    {/* Render filtered tasks */}
                    {filteredTasks.map((task,index) => (
                        <tbody key={task.taskID}>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index+1}
                                </th>
                                <td className="px-6 py-4">
                                {task.user.userID}
                                </td>
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
                    ))}
                </table>
            </div>
        </div>
    );
}

export default Task;
