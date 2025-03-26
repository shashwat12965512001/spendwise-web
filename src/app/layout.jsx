import Navbar from "@/Components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Spendwise-Web",
  description: "Spendwise-Expense & Budget Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black-100 text-gray-900 font-sans">
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap" rel="stylesheet" />
        {/* Header */}
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Spendwise</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

            {/* Menu */}
            <Navbar />

          </div>
        </nav>

        {/* Content */}
        <main className="min-h-screen mx-auto p-4 spendwise-main-content">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 ">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <a href="#" className="flex items-center">
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Spendwise</span>
                </a>
              </div>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Contact</a>
                </li>
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; 2025 Spendwise. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
