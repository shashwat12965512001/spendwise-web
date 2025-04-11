"use client";

import Dashboard from "@/components/Home";
import Link from "next/link";
import useIsMobile from "./hooks/useIsMobile";
import useAuth from "./hooks/useAuth";
import Loader from "@/components/Loader";

export default () => {
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);
  useAuth();

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <Loader />;
  return (

    <>
      {
        isMobile ? (
          <Dashboard />
        ) : (<div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Spendwise</h1>
          <Link href="/dashboard">
            <button className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-all duration-200 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>)
      }

    </>

  );
};