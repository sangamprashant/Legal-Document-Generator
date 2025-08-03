import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/AuthenticationContext';
import { server } from '../../utilities';
import PageHeader from '../banner/PageHeader';

const UploadDocuments = () => {
    const [fileInputs, setFileInputs] = useState<File[]>([]);
    const [status, setStatus] = useState('Pending');
    const [caseId, setCaseId] = useState('');
    const [userId, setUserId] = useState('');
    const { user, token } = useAuth();

    const handleFileChange = (index: number, file: File | null) => {
        const updatedFiles = [...fileInputs];
        if (file) {
            updatedFiles[index] = file;
        } else {
            updatedFiles.splice(index, 1); 
        }
        setFileInputs(updatedFiles);
    };

    const addMoreFiles = () => {
        setFileInputs([...fileInputs, new File([], '')]);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fileInputs.length || !caseId || !userId) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        fileInputs.forEach((file) => formData.append('documents', file));
        formData.append('status', status);
        formData.append('case_id', caseId);
        formData.append('user_id', userId);

        try {
            const res = await fetch(`${server}/documents/upload`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data' // Do not set Content-Type for FormData
                },
                body: formData,
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to upload documents');
            }
            const data = await res.json();
            toast.success('Documents uploaded successfully!');
            console.log(data);
            console.log(res);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while uploading documents.');
        }

    };

    useEffect(() => {
        if (user?.role === "user") {
            setUserId(user.id as string);
            setStatus("Pending");
        }
    }, [user]);

    return (
        <>
            <PageHeader title="Upload supporting documents for the case" />
            <div className="p-4">
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="block mb-1">Case ID</label>
                        <input
                            type="text"
                            value={caseId}
                            onChange={(e) => setCaseId(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    {user?.role !== "user" && (
                        <>
                            <div>
                                <label className="block mb-1">User ID</label>
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full border px-3 py-2 rounded"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block mb-2">Upload Documents</label>
                        {fileInputs.map((_, index) => (
                            <input
                                key={index}
                                type="file"
                                onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                className="w-full border px-3 py-2 rounded mb-2"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addMoreFiles}
                            className="bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400"
                        >
                            + Add More
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </>
    );
};

export default UploadDocuments;
