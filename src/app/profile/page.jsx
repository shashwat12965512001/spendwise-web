"use client";

import ProfileMobile from "@/components/ProfileMobile";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default () => {
    const [ready, setReady] = useState(false);

    useAuth();

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) return <Loader />;

    return (
        <ProfileMobile />
    );
};