import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AddProject = () => {
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center w-full mt-10">
                <form className="w-full mx-6">
                    <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                    <textarea id="Name" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="describe the project..."></textarea>
                    <label htmlFor="Description" className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                    <textarea id="Description" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="describe the project..."></textarea>
                    <Link to="/admin/projects-list"><button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add project</button></Link>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default AddProject;