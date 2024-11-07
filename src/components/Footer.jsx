const Footer = () => {
    return (
        <div className="fixed bottom-0 w-screen flex flex-col">
            <div className="flex-grow">
                {/* Main content goes here */}
            </div>
            <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
                <div className="text-center w-full max-w-screen-xl mx-auto md:py-2">
                    <hr className="w-full my-3 border-gray-800 sm:mx-auto dark:border-gray-700 lg:my-3" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024 TimeSheet™. All Rights Reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
