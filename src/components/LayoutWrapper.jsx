"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
    return (
        <>
            {/* Top bar for mobile / Header for desktop */}
            <Header />

            {/* Main Content */}
            <main className="mx-auto lg:p-4 spendwise-main-content mb-15">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
