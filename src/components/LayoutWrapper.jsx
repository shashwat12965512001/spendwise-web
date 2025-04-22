"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function LayoutWrapper({ children }) {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user && user._id || user && user.id;
        if (id && window.FlutterBridge) {
            window.FlutterBridge.postMessage(id);
        } else {
            console.log("FlutterBridge or user._id missing");
        }
    }, []);


    return (
        <>
            {/* Top bar for mobile / Header for desktop */}
            <Header />

            {/* Main Content */}
            <main className="min-h-screen mx-auto lg:p-4 spendwise-main-content mb-15">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
