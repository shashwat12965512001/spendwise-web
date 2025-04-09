"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import TopBar from "@/components/TopBar";
import useIsMobile from "../app/hooks/useIsMobile";

export default function LayoutWrapper({ children }) {
    const isMobile = useIsMobile();

    return (
        <>
            {/* Top bar for mobile / Header for desktop */}
            {isMobile ? <TopBar /> : <Header />}

            {/* Main Content */}
            <main className="mx-auto p-4 min-h-screen spendwise-main-content">
                {children}
            </main>

            {/* Footer */}
            {!isMobile && <Footer />}

            {/* Bottom Navigation for mobile */}
            {isMobile && <BottomNavigationBar />}
        </>
    );
}
