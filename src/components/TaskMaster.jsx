import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const TaskMaster = () => {
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center w-full mt-10">
                <form className="w-full mx-6">
                    <div class="mb-5">
                        <label htmlFor="user-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
                        <input type="text" id="user-id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="mb-5">
                        <label htmlFor="Project-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-5">
                    <label htmlFor="task-detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">task-detail</label>
                    <textarea id="task-detail" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="task describe..."></textarea>
                    </div>
                    <div className="mb-5">
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">duration</label>
                    <input id="duration" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="task duration..." />
                    </div>
                    <Link to="/user/projects-list"><button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add project</button></Link>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default TaskMaster;