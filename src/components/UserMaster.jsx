import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import Footer from './Footer';

const UserMaster = () => {
    return (
        <>
            <NavBar />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Project ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <Link to={`/user/project-detail/{id:5}`}>
                                    ar-1098
                                </Link>
                            </th>
                            <td className="px-6 py-4">
                                <Link to={`/user/project-detail/{id:5}`}>
                                    Shashank Shinde
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <Link to={`/user/project-detail/{id:5}`}>
                                    vc-109
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <Link to={`/user/project-detail/{id:5}`}>
                                    web application
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <Link to={`/user/project-detail/{id:5}`}>
                                    12/09/2024
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <Link to="/user/edit-project" className=" mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <Link to="/user/delete-project" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    )
}

export default UserMaster;