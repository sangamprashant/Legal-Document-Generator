import Stats from "./dashboard/Stats";

const Dashboard = () => {
    return (
        <div className="p-4">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                    Document Generator Dashboard
                </h1>

                {/* Intro Card */}
                <div className="bg-white shadow rounded-xl p-6 mb-8">
                    <p className="text-gray-600 text-lg mb-4">
                        Welcome to your document generation dashboard. Here you can track
                        cases, manage documents, and monitor performance based on your role.
                    </p>
                    <p className="text-gray-700">
                        This system allows <strong>Users</strong> to upload documents, create and
                        track cases, while <strong>Advocates</strong> can manage client cases,
                        review documents, and monitor case progress.
                    </p>
                </div>

                <Stats />

                {/* Project Overview */}
                <div className="bg-white shadow rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Project Overview</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>
                            <strong>Case Management:</strong> Track and manage cases with real-time status updates.
                        </li>
                        <li>
                            <strong>Document Review:</strong> Upload, approve, or request changes to documents.
                        </li>
                        <li>
                            <strong>Role-Based Dashboard:</strong> Different KPIs for Users and Advocates.
                        </li>
                        <li>
                            <strong>Secure Storage:</strong> All files are stored securely in the database.
                        </li>
                        <li>
                            <strong>MySQL Backend:</strong> Powered by Express.js and MySQL for fast queries.
                        </li>
                    </ul>
                </div>

                {/* Role Explanation */}
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Roles in the System</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">👤 User</h3>
                            <p className="text-gray-700">
                                Can create cases, upload supporting documents, and track
                                case progress. The dashboard shows:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li>Total Cases</li>
                                <li>Pending Documents</li>
                                <li>Resolved Cases</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">⚖️ Advocate</h3>
                            <p className="text-gray-700">
                                Can manage multiple clients, oversee cases, and review
                                uploaded documents. The dashboard shows:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li>Total Clients</li>
                                <li>Cases in Progress</li>
                                <li>Documents Reviewed</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}

            </div>
        </div>
    );
};

export default Dashboard;
