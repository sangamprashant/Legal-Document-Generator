import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthenticationContext";
import { docServer } from "../../utilities";
import { apiRequest } from "../../utilities/apiRequest";
// Optional: import icons
import { FaFileAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CaseIDHandle = ({ id }: { id: string }) => {
    const [caseData, setCaseData] = useState<CaseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        const fetchCaseDetails = async () => {
            try {
                const res = await apiRequest({
                    url: `/cases/case-data/${id}`,
                    method: "GET",
                    token: token as string,
                });
                setCaseData(res);
            } catch {
                setError("❌ Failed to fetch case details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCaseDetails();
    }, [id]);

    if (loading)
        return <p className="text-blue-500 animate-pulse text-center mt-4">Loading case details...</p>;
    if (error)
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    if (!caseData)
        return <p className="text-gray-500 text-center mt-4">No data found.</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
                📁 Case ID: <span className="text-blue-600">{caseData.case_id}</span>
            </h2>

            {/* Case Details */}
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 space-y-2">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Case Details</h3>
                <p><strong>Status:</strong> {caseData.case_status}</p>
                <p><strong>From:</strong> {caseData.case_from}</p>
                <p><strong>To:</strong> {caseData.case_to}</p>
                <p><strong>Description:</strong> <span className="text-gray-700">{caseData.description}</span></p>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">👤 User Info</h3>
                <p><strong>Name:</strong> {caseData.user.name}</p>
                <p><strong>Email:</strong> {caseData.user.email}</p>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">📄 Documents</h3>
                {caseData.documents.length === 0 ? (
                    <p className="text-gray-500">No documents available.</p>
                ) : (
                    <ul className="space-y-4">
                        {caseData.documents.map((doc) => (
                            <DocumentItem key={doc.doc_id} doc={doc} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CaseIDHandle;


const DocumentItem = ({ doc }: { doc: DocumentDetail }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <li
            key={doc.doc_id}
            className="bg-gray-50 hover:bg-gray-100 transition rounded-lg p-4 border shadow-sm space-y-2"
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-sm"><strong>Type:</strong> {doc.doc_type ?? "N/A"}</p>
                    <p className="text-sm">
                        <strong>Status:</strong>{" "}
                        {doc.doc_status === "approved" ? (
                            <span className="text-green-600 font-medium inline-flex items-center gap-1">
                                <FaCheckCircle className="text-sm" /> Approved
                            </span>
                        ) : (
                            <span className="text-yellow-600 font-medium inline-flex items-center gap-1">
                                <FaTimesCircle className="text-sm" /> {doc.doc_status ?? "Pending"}
                            </span>
                        )}
                    </p>
                </div>

                <button
                    onClick={toggleExpand}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm font-medium"
                >
                    <FaFileAlt /> {expanded ? "Hide" : "View"}
                </button>
            </div>

            {expanded && (
                <div className="mt-3 border rounded overflow-hidden">
                    <iframe
                        src={`${docServer}/${doc.file_path}`}
                        className="w-full h-[400px]"
                        title={`Document ${doc.doc_id}`}
                    ></iframe>
                </div>
            )}
        </li>
    );
};