"use client";

export default function TopBar() {
    return (
        <div className="w-full bg-white dark:bg-gray-900 shadow px-4 py-5">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-35 h-6" src="/assets/img/app_logo_light.png" alt="Spendwise" />
                </h1>
            </div>
        </div>
    );
}
