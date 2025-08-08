import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthenticationContext";
import { docServer } from "../../utilities";
import { apiRequest } from "../../utilities/apiRequest";
import { toast } from "react-toastify";
import {
    FaFileAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaQuestionCircle,
} from "react-icons/fa";
import { CASE_STATUS, CaseStatus } from "../../utilities/case";
import { RiAiGenerateText } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";


import { Link } from "react-router-dom";

const CaseIDHandle = ({ id }: { id: string }) => {
    const [caseData, setCaseData] = useState<CaseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token, user } = useAuth();

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
    }, [id, token]);

    if (loading) return <p className="text-blue-500 animate-pulse text-center mt-4">Loading case details...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
    if (!caseData) return <p className="text-gray-500 text-center mt-4">No data found.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
                📁 Case ID: <span className="text-blue-600">{caseData.case_id}</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
                <UserData caseData={caseData} />

                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">👤 User Info</h3>
                    <p><strong>Name:</strong> {caseData.user.name}</p>
                    <p><strong>Email:</strong> {caseData.user.email}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Documents</h3>
                    <div className="flex items-center gap-2 text-gray-500">
                        {user?.role === "advocate" && <>
                            <Link to={`/documents/generate?case_id=${caseData.case_id}`} className="text-blue-600 flex items-center gap-1">
                                <RiAiGenerateText className="inline-block" /><span className="hidden md:block">Generate Document</span>
                            </Link>
                            <RxDividerVertical fontSize={30} className="text-blue-500" />
                        </>}
                        <Link to={`/documents/upload?case_id=${caseData.case_id}${user?.role === "advocate" ? `&user_id=${caseData.user.user_id}` : ""} `} className="text-blue-600 flex items-center gap-1">
                            <IoCloudUploadOutline className="inline-block" /> <span className="hidden md:block">Upload Document</span>
                        </Link>

                    </div>
                </div>
                {caseData.documents.length === 0 ? (
                    <p className="text-gray-500">No documents available.</p>
                ) : (
                    <ul className="space-y-4">
                        {caseData.documents.reverse().map((doc) => (
                            <DocumentItem key={doc.doc_id} data={doc} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CaseIDHandle;

const UserData = ({ caseData }: { caseData: CaseDetail }) => {
    const { token, user } = useAuth();
    const [cs, setCase] = useState<CaseDetail>(caseData);
    const [status, setStatus] = useState<CaseStatus>(cs.case_status);

    useEffect(() => {
        if (cs.case_status !== status) {
            updateCaseStatus();
        }
    }, [status])

    const updateCaseStatus = useCallback(async () => {
        try {
            await apiRequest({
                url: `/cases/status/${cs.case_id}`,
                method: "PUT",
                data: { status },
                token: token as string
            });
            setCase((prev) => ({ ...prev, case_status: status }));
            toast.success("Case status updated successfully.");
        }
        catch (error) {
            console.error("Failed to update case status:", error);
            toast.error("Failed to update case status.");
        }
    }, [cs.case_id, status]);

    return (
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">📌 Case Details</h3>
                {user?.role === "advocate" && <select value={cs.case_status} onChange={(e) => setStatus(e.target.value as CaseStatus)}>
                    {CASE_STATUS.map((c, i) => (<option key={i} value={c}>{c}</option>))}
                </select>}
            </div>
            <p><strong>Status:</strong> {cs.case_status}</p>
            <p><strong>From:</strong> {cs.case_from}</p>
            <p><strong>To:</strong> {cs.case_to}</p>
            <p><strong>Description:</strong> <span className="text-gray-700">{cs.description}</span></p>
        </div>
    )
}

const DocumentItem = ({ data }: { data: DocumentDetail }) => {
    const [doc, setDoc] = useState<DocumentDetail>(data);
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState(data.doc_status);
    const { user } = useAuth();

    const toggleExpand = () => setExpanded((prev) => !prev);

    const updateStatus = useCallback(async () => {
        if (user?.role !== "advocate" || status === doc.doc_status) return;

        try {
            await apiRequest({
                url: `/documents/status/${doc.doc_id}`,
                method: "PUT",
                data: { status },
            });
            setDoc((prev) => ({ ...prev, doc_status: status }));
            toast.success("Document status updated.");
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }, [status, doc.doc_id, doc.doc_status, user?.role]);

    useEffect(() => {
        updateStatus();
    }, [status, updateStatus]);

    return (
        <li className="bg-gray-50 hover:bg-gray-100 transition rounded-lg p-4 border shadow-sm space-y-2">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-sm">
                        <strong>Type:</strong> {doc.doc_type ?? "N/A"}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                        <strong>Status:</strong> <StatusBadge status={doc.doc_status ?? "Pending"} />
                    </p>
                </div>

                <div className="flex gap-2 items-start">
                    {user?.role === "advocate" && (
                        <select
                            value={status as string}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    )}

                    <button
                        onClick={toggleExpand}
                        className="inline-flex border rounded px-2 py-1 items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm font-medium"
                    >
                        <FaFileAlt /> {expanded ? "Hide" : "View"}
                    </button>
                </div>
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

const StatusBadge = ({ status }: { status: string }) => {
    let icon = <FaQuestionCircle />;
    let color = "bg-gray-200 text-gray-700";

    switch (status) {
        case "Approved":
            icon = <FaCheckCircle />;
            color = "bg-green-100 text-green-700";
            break;
        case "Pending":
            icon = <FaHourglassHalf />;
            color = "bg-yellow-100 text-yellow-700";
            break;
        case "Rejected":
            icon = <FaTimesCircle />;
            color = "bg-red-100 text-red-700";
            break;
    }

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${color}`}>
            {icon} {status}
        </span>
    );
};
