export default () => {

    // Reusable item for security or general settings
    function SettingItem({ label }) {
        return (
            <div className="flex justify-between text-sm items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">{label}</span>
                <button className="text-blue-500 text-sm">Edit</button>
            </div>
        );
    }

    // Reusable toggle component
    function ToggleItem({ label }) {
        return (
            <div className="flex justify-between text-sm items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">{label}</span>
                <input type="checkbox" className="toggle toggle-primary" />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-6 px-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>

                <div className="space-y-4">
                    {/* Profile Section */}
                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                {/* Add Profile Image */}
                                <svg className="w-8 h-8 m-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Logged in as</p>
                                <p className="font-medium text-gray-900">shashwat@gmail.com</p>
                            </div>
                        </div>
                        <button className="text-sm text-blue-500 hover:underline">Edit</button>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                            <svg className="h-4 w-4 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                            <h3 className="text-gray-700 text-sm font-medium">Preferences</h3>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Dark Mode</span>
                            <label className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                            </svg>
                            <h3 className="text-gray-700 text-sm font-medium">Account</h3>
                        </div>

                        <SettingItem label="Change Password" />
                        <SettingItem label="Two-Factor Authentication" />
                        <SettingItem label="Login History" />

                        <button className="w-full text-left text-sm text-red-500 py-2">
                            Logout
                        </button>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"></path>
                            </svg>
                            <h3 className="text-gray-700 text-sm font-medium">Notifications & Reminders</h3>
                        </div>
                        <ToggleItem label="Enable Notifications" />
                        <ToggleItem label="Smart Spending Notifications" />
                        <ToggleItem label="Daily Summary" />
                        <ToggleItem label="Weekly Summary" />
                        <ToggleItem label="Hide Default SMS Notifications" />
                    </div>
                </div>
            </div>

        </>
    );
};