import { useState } from "react";

const ToggleSwitch = ({ label, initialState = false, onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(initialState);

    const handleToggle = () => {
        setIsEnabled(!isEnabled);
        if (onToggle) onToggle(!isEnabled); // Call parent function if provided
    };

    return (
        <div className="flex flex-row justify-between items-center cursor-pointer py-2">
            <p className="text-md font-semibold">{label}</p>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isEnabled}
                    onChange={handleToggle}
                    value={isEnabled}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;
