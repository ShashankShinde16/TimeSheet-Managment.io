import { useState } from "react";

const SearchFilter = ({
    projectIdFilter,
    projectNameFilter,
    setProjectIdFilter,
    setProjectNameFilter,
    handleSearchFeature,
}) => {

    return (
        <div className="flex justify-center items-center gap-3 py-2 bg-gray-200">
            <label htmlFor="projectId-search" className="sr-only">Search</label>
            <input
                type="text"
                id="projectId-search"
                className="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by project Id"
                value={projectIdFilter}
                onChange={(e) => setProjectIdFilter(e.target.value)}
            />
            <label htmlFor="projectName-search" className="sr-only">Search</label>
            <input
                type="text"
                id="projectName-search"
                className="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Project Name"
                value={projectNameFilter}
                onChange={(e) => setProjectNameFilter(e.target.value)}
            />
            <button
                onClick={handleSearchFeature}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Search
            </button>
        </div>
    );
};

export default SearchFilter;
