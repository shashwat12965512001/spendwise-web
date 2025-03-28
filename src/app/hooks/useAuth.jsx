import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login"); // Redirect to login if no token
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return { isAuthenticated };
};

export default useAuth;
