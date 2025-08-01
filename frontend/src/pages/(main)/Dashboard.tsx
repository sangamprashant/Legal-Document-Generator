import { useAuth } from "../../providers/AuthenticationContext";
import Stats from "./dashboard/Stats";

const Dashboard = () => {
    const { user } = useAuth()
    return (
        <div className="p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Document Generator Dashboard</h1>

                <div className="bg-white shadow rounded-xl p-6 mb-8">
                    <p className="text-gray-600 text-lg">
                        Welcome to your document generation dashboard. Monitor performance, usage, and insights here.
                    </p>
                </div>

                <Stats />
                {JSON.stringify(user, null, 2)}
            </div>
        </div>
    );
};

export default Dashboard;
