import * as htmlToImage from 'html-to-image';
import JoditEditor from "jodit-react";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/AuthenticationContext";
import { apiRequest } from "../../utilities/apiRequest";
import { generateRandom10DigitNumber, IndianStates, indianStates } from "./states";
import { server } from '../../utilities';

const CreateTemplate = ({ case_id }: { case_id: string | undefined | null }) => {
    const [caseId, setCaseId] = useState<string>(case_id || "");
    const [inputCaseId, setInputCaseId] = useState<string>("");
    const [caseData, setCaseData] = useState<any>(null);
    const { token } = useAuth();
    // geenerater document 
    const [generating, setGenerating] = useState(false);
    const [openGenerator, setOpenGenerator] = useState(false);
    const [prompt, setPrompt] = useState<string>("");
    const [editorContent, setEditorContent] = useState<string>("");
    const editorRef = useRef(null);
    const [isPreview, setIsPreview] = useState(false);
    const [note, setNote] = useState("10")
    const [state, setState] = useState<IndianStates>("Uttar Pradesh")
    const [noteId, setNoteId] = useState("")

    useEffect(() => {
        if (caseId && token) {
            fetchData();
        }
    }, [caseId, token]);

    useEffect(() => {
        setNoteId(generateRandom10DigitNumber().toString() as string)
    }, [note, state])

    const handleManualSubmit = () => {
        if (inputCaseId.trim()) {
            setCaseId(inputCaseId.trim());
        }
    };

    useEffect(() => {
        if (caseData) {
            const { case_from, case_to, description } = caseData;
            const prompt = `Draft a formal legal document for a case with the following details:
        - Case From: ${case_from}
        - Case To: ${case_to}
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
                            onClick={generateData}
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
            {editorContent && (
                <div className="mt-8 bg-white p-4 shadow rounded">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">
                            {isPreview ? "Preview Document" : "Editable Document"}
                        </h3>
                        <div className={`flex flex-wrap gap-1`}>
                            {isPreview && (<>
                                <select className="border rounded uppercase"
                                    value={state}
                                    onChange={(e => setState(e.target.value as IndianStates))}
                                >
                                    <option value="" disabled>-- Select State --</option>
                                    {indianStates.map((s, i) => (
                                        <option key={i} value={s}>{s}</option>
                                    ))}
                                </select>
                                <select className="border rounded"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                >
                                    <option value="" disabled>-- --</option>
                                    {["10", "20", "50", "100", "500", "1000", "5000"].map((d, i) => (
                                        <option key={i} value={d}>₹ {d}</option>
                                    ))}
                                </select>
                                <button
                                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 "
                                    onClick={uploadAsPDF}
                                >
                                    <IoCloudUploadOutline />
                                    Save
                                </button>
                            </>)}
                            <button
                                onClick={() => setIsPreview(!isPreview)}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                <FaRegEye />
                                {isPreview ? "Edit" : "Preview"}
                            </button>
                        </div>
                    </div>

                    {isPreview ? (
                        <div className="border">
                            <div id="generated">
                                <div className="p-10 ">
                                    <img src={`/AFFIDAVIT/${note}.png`} className="w-full h-full" alt="" />
                                    <div className="flex justify-between text-red-500 py-3">
                                        <p className="uppercase">{state}</p>
                                        <p>{noteId}</p>
                                    </div>
                                    <div
                                        className="prose max-w-full rounded bg-gray-50"
                                        dangerouslySetInnerHTML={{ __html: editorContent }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <JoditEditor
                            ref={editorRef}
                            value={editorContent}
                            onChange={(newContent) => setEditorContent(newContent)}
                        />
                    )}
                </div>
            )}
        </div>
    );

    async function uploadAsPDF() {
        try {
            const element = document.getElementById("generated");
            if (!element) return;

            // Capture element as PNG
            const dataUrl = await htmlToImage.toPng(element);

            // Get image properties
            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve) => { img.onload = resolve; });

            // Calculate PDF size to fit whole image in one page
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = (img.height * pdfWidth) / img.width; // proportional height in mm

            // Create PDF with custom height (single long page)
            const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

            const pdfBlob = pdf.output("blob");

            // Prepare FormData
            const formData = new FormData();
            formData.append("documents", pdfBlob, "document.pdf");
            formData.append("case_id", caseData.case_id);
            formData.append("user_id", caseData.user_id);

            // Upload — don't set Content-Type manually
            await fetch(`${server}/generate/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            console.log("Uploaded successfully");
        } catch (error) {
            console.error("Upload failed:", error);
        }
    }



    async function generateData() {
        try {
            setGenerating(true)

            const res = await apiRequest({
                method: "POST",
                url: "/generate/generate-doc",
                data: { prompt },
                token: token as string
            })

            setEditorContent(`<pre>${res.result || ""}</pre>`);
            setOpenGenerator(false)

        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            toast.error(message);
        } finally {
            setGenerating(false)
        }
    }

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
};

export default CreateTemplate;
