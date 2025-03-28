import Link from "next/link";

export default () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Welcome to SpendWise</h1>
      <Link href="/dashboard">
        <button className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer"> Get Started
        </button>
      </Link>
    </div>
  );
};