export default () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                    {/* Logo Section */}
                    <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
                        <a href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Spendwise
                            </span>
                        </a>
                    </div>

                    {/* Links Section */}
                    <ul className="flex flex-row sm:flex-row sm:flex-wrap items-center text-center md:text-left text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 sm:mb-0 justify-center">
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>

                    {/* Copyright Section */}
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
                        <p>&copy; 2025 Spendwise. All rights reserved.</p>
                    </div>

                </div>
            </div>
        </footer>

    );
};