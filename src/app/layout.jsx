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
        <Script id="send-user-id-to-flutter" strategy="afterInteractive">
          {`
            window.onload = function () {
              const user = JSON.parse(localStorage.getItem("user"));
              if (user && user._id && window.FlutterBridge) {
                window.FlutterBridge.postMessage(user._id);
              }
            };
          `}
        </Script>
      </body>
    </html>
  );
}
