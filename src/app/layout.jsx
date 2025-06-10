import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
  title: "Spendwise-Web",
  description: "Spendwise-Expense & Budget Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className="bg-black-100 text-gray-900 font-sans hydrated" data-new-gr-c-s-check-loaded="14.1239.0" data-gr-ext-installed="">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Script id="send-user-id-to-flutter" strategy="afterInteractive">
          {`
            window.onload = function () {
              const user = JSON.parse(localStorage.getItem("user"));
              const id = user && user._id || user && user.id;
              if (id && window.FlutterBridge) {
                window.FlutterBridge.postMessage(id);
              }
            };
          `}
        </Script>
      </body>
    </html>
  );
}
