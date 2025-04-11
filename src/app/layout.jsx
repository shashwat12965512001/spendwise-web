// NO "use client" here!
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Spendwise-Web",
  description: "Spendwise-Expense & Budget Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className="bg-black-100 text-gray-900 font-sans hydrated" data-new-gr-c-s-check-loaded="14.1231.0" data-gr-ext-installed="">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
