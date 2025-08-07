import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/AuthenticationContext";
import { apiRequest } from "../../utilities/apiRequest";

const CreateTemplate = ({ case_id }: { case_id: string | undefined | null }) => {
    const [caseId, setCaseId] = useState<string>(case_id || "");
    const [inputCaseId, setInputCaseId] = useState<string>("");
    const [caseData, setCaseData] = useState<any>(null);
    const { token } = useAuth();
    // geenerater document 
    const [generating, setGenerating] = useState(false);
    const [openGenerator, setOpenGenerator] = useState(false);
    const [prompt, setPrompt] = useState<string>("");

    useEffect(() => {
        if (caseId) {
            fetchData();
        }
    }, [caseId]);

    async function fetchData() {
        try {
            const res = await apiRequest({
                url: `/cases/${caseId}`,
                method: "GET",
                token: token as string,
            });

            setCaseData(res);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Failed to fetch case data"
            );
        }
    }

    const handleManualSubmit = () => {
        if (inputCaseId.trim()) {
            setCaseId(inputCaseId.trim());
        }
    };

    useEffect(() => {
        if (caseData) {
            const { case_from, case_to, description, status } = caseData;
            const prompt = `Draft a formal legal document for a case with the following details:
        - Case From: ${case_from}
        - Case To: ${case_to}
        - Case Status: ${status}
        - Case Description: ${description}

Please write this document in a professional tone suitable for legal purposes.`;

            setPrompt(prompt.trim());
        }
    }, [caseData]);


    return (
        <div className="p-4 max-w-7xl mx-auto">
            {!case_id && (
                <div className="mb-6 bg-white p-4 shadow rounded">
                    <label className="block mb-2 font-medium">Enter Case ID:</label>
                    <input
                        type="text"
                        value={inputCaseId}
                        onChange={(e) => setInputCaseId(e.target.value)}
                        placeholder="e.g. 123456"
                        className="border px-4 py-2 rounded w-full"
                    />
                    <button
                        onClick={handleManualSubmit}
                        className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Submit
                    </button>
                </div>
            )}

            {caseId && !caseData && (
                <div className="text-gray-600 text-center mt-10">Loading case data...</div>
            )}

            {caseData && (
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Case Summary
                    </h2>
                    <div className="space-y-3">
                        <div>
                            <span className="font-semibold text-gray-700">Case ID:</span>{" "}
                            {caseData.case_id}
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Status:</span>{" "}
                            <span
                                className={`px-2 py-1 rounded text-sm ${caseData.status === "Resolved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {caseData.status}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">User ID:</span>{" "}
                            {caseData.user_id}
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">From:</span>{" "}
                            {caseData.case_from}
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">To:</span>{" "}
                            {caseData.case_to}
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Description:</span>{" "}
                            <span className="text-gray-800">{caseData.description}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpenGenerator(true)}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg font-medium"
                    >
                        Generate Document
                    </button>
                </div>
            )}

            {openGenerator && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
                        <h3 className="text-xl font-semibold mb-4">Generate Document</h3>
                        <p className="mb-4">Are you sure you want to generate a document for this case?</p>

                        <label htmlFor="prompt">Default Prompt</label>
                        <textarea
                            id="prompt"
                            rows={4}
                            className="w-full border px-3 py-2 rounded mb-4"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            readOnly
                        ></textarea>

                        <button
                            onClick={() => {
                                setGenerating(true);
                                setTimeout(() => {
                                    setGenerating(false);
                                    setOpenGenerator(false);
                                    toast.success("Document generated successfully!");
                                }, 2000);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                        >
                            {generating ? "Generating..." : "Confirm and Generate"}
                        </button>
                        <button
                            onClick={() => setOpenGenerator(false)}
                            className="mt-3 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* show generated data  */}

        </div>
    );
};

export default CreateTemplate;
