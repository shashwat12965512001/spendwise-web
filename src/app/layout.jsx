import Navbar from "@/Components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Spendwise-Web",
  description: "Spendwise-Expense & Budget Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className="bg-black-100 text-gray-900 font-sans hydrated" data-new-gr-c-s-check-loaded="14.1229.0" data-gr-ext-installed="">
        {/* Links */}
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap" rel="stylesheet" />

        {/* Header */}
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Spendwise</span>
            </a>

            {/* Menu */}
            <Navbar />

          </div>
        </nav>

        {/* Content */}
        <main className="min-h-screen mx-auto p-4 spendwise-main-content">
          {children}
        </main>

        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>

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
    </html >
  );
}
