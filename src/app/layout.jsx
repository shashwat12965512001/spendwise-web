import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
        <Header />

        {/* Content */}
        <main className="min-h-screen mx-auto p-4 spendwise-main-content">
          {children}
        </main>

        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>

        {/* Footer */}
        <Footer />

      </body>
    </html >
  );
}
