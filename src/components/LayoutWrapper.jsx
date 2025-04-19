"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function LayoutWrapper({ children }) {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id && window.FlutterBridge) {
            window.FlutterBridge.postMessage(user._id);
        } else {
            console.log("FlutterBridge or user._id missing");
        }
    }, []);


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
