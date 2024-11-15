import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const AdminTable = ({filteredProjects,onChange}) => {

    const handleOnDelete = (event, projectID) => {
        event.preventDefault();

        // Show a custom toast with Yes/No buttons
        const confirmDelete = toast(
            <div>
                <p>Are you sure you want to delete this project?</p>
                <div>
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/ProjectAPI/id?id=${projectID}`);
                                toast.success('Project deleted successfully!', {
                                    autoClose: 1500,
                                    hideProgressBar: false,
                                });

                                setTimeout(() => {
                                    onChange(true);
                                    // setRefresh((prev) => !prev);
                                }, 1500);


                            } catch (error) {
                                toast.error(`Error: ${error.response?.data?.errorMesseges || 'Something went wrong'}`);
                            }
                            toast.dismiss(confirmDelete); // Dismiss the confirmation toast after action
                        }}
                        className="bg-red-600 text-white px-3 py-1 mr-2 rounded"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(confirmDelete)} // Dismiss the toast if canceled
                        className="bg-gray-600 text-white px-3 py-1 rounded"
                    >
                        No, Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false, // Don't auto-close, until user interacts
                closeOnClick: false, // Prevent closing by clicking outside
                draggable: false,
                hideProgressBar: true,
            }
        );
    };

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleDateString('en-GB').split('T')[0];
      };

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Project ID</th>
                            <th scope="col" className="px-6 py-3">Project Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Users</th>
                            <th scope="col" className="px-6 py-3">Create Date / Update Date</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    {filteredProjects.map((project) => {
                        return (
                            <tbody key={project.projectID}>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.projectID}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.description}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {project.status}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"User"}>
                                            {project.users}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/project-detail/${project.projectID}`} state={"project"}>
                                            {formatDate(project.createDate)+" / "+formatDate(project.updateDate)}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to='/admin/project-detail/update-project'
                                            state={project}
                                            className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        <Link
                                            onClick={(event) => handleOnDelete(event, project.projectID)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
    );
};

export default AdminTable;
