import { HomeIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t flex justify-around py-2">
            <HomeIcon className="h-6 w-6 text-blue-500" />
            <ChartBarIcon className="h-6 w-6 text-gray-500" />
            <UserIcon className="h-6 w-6 text-gray-500" />
        </nav>
    );
}