import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ProjectDetails = () => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState("project");

    // Function to handle tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <NavBar />

            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <ul className="flex justify-around text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" role="tablist">
                    <li className="me-2">
                        <button
                            id="project-tab"
                            type="button"
                            role="tab"
                            aria-controls="project"
                            aria-selected={activeTab === "project"}
                            onClick={() => handleTabClick("project")}
                            className={`inline-block p-4 ${activeTab === "project" ? "text-blue-600 dark:text-blue-500" : "text-gray-500"} rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700`}>
                            Project Details
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            id="User-tab"
                            type="button"
                            role="tab"
                            aria-controls="User"
                            aria-selected={activeTab === "User"}
                            onClick={() => handleTabClick("User")}
                            className={`inline-block p-4 ${activeTab === "User" ? "text-blue-600 dark:text-blue-500" : "text-gray-500"} hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>
                            User Details
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            id="status-tab"
                            type="button"
                            role="tab"
                            aria-controls="status"
                            aria-selected={activeTab === "status"}
                            onClick={() => handleTabClick("status")}
                            className={`inline-block p-4 ${activeTab === "status" ? "text-blue-600 dark:text-blue-500" : "text-gray-500"} hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}>
                            status
                        </button>
                    </li>
                </ul>

                <div id="defaultTabContent" className="flex justify-around">
                    <div
                        className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${activeTab === "project" ? "" : "hidden"}`}
                        id="project"
                        role="tabpanel"
                        aria-labelledby="project-tab"
                    >
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Powering innovation & trust at 200,000+ companies worldwide
                        </h2>
                        <p className="mb-3 text-gray-500 dark:text-gray-400">
                            Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond to changes and deliver great customer and employee service experiences fast.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
                        >
                            Learn more
                            <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </a>
                    </div>

                    <div
                        className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${activeTab === "User" ? "" : "hidden"}`}
                        id="User"
                        role="tabpanel"
                        aria-labelledby="User-tab"
                    >
                        <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            We invest in the world’s potential
                        </h2>
                        {/* List of user */}
                        <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                            <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="leading-tight">Dynamic reports and dashboards</span>
                            </li>
                            <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="leading-tight">Templates for everyone</span>
                            </li>
                            <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="leading-tight">Development workflow</span>
                            </li>
                            <li class="flex space-x-2 rtl:space-x-reverse items-center">
                                <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="leading-tight">Limitless business automation</span>
                            </li>
                        </ul>
                    </div>

                    <div
                        className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${activeTab === "status" ? "" : "hidden"}`}
                        id="status"
                        role="tabpanel"
                        aria-labelledby="status-tab"
                    >
                        <div className="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-3 dark:text-white sm:p-8">
                            <div className="flex flex-col">
                                <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                                <dd className="text-gray-500 dark:text-gray-400">Developers</dd>
                            </div>
                            <div class="flex flex-col">
                                <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
                                <dd class="text-gray-500 dark:text-gray-400">Public repositories</dd>
                            </div>
                            <div class="flex flex-col">
                                <dt class="mb-2 text-3xl font-extrabold">1000s</dt>
                                <dd class="text-gray-500 dark:text-gray-400">Open source projects</dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetails;
