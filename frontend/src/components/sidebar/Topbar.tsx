import { HiMenu } from "react-icons/hi";
import { useAuth } from "../../providers/AuthenticationContext";
import { useSidebar } from "../../providers/SidebarContext";

const Topbar = () => {
    const { toggleSidebar } = useSidebar()
    const { user } = useAuth();
    return (
        <div className="sticky top-0 w-full bg-white shadow-md dark:bg-gray-900 dark:text-gray-200 px-4 py-4 flex items-center justify-between z-40">
            <button onClick={() => toggleSidebar()} className="md:hidden text-gray-700 dark:text-gray-300">
                <HiMenu size={24} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user?.name || "User"}</span>
                | <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">{user?.role}</span>
            </div>
        </div>
    );
};

export default Topbar;
