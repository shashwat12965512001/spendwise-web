"use client";

import ProfileMobile from "@/components/ProfileMobile";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";

export default () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) return <Loader />;

    return (
        <ProfileMobile />
    );
};