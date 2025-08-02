import React, { useEffect, useState } from 'react';
import PageHeader from '../banner/PageHeader';
import { useAuth } from '../../providers/AuthenticationContext';
// import axios from 'axios';

const UploadDocuments = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [status, setStatus] = useState('Pending');
    const [caseId, setCaseId] = useState('');
    const [userId, setUserId] = useState('');
    const { user } = useAuth();

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files || !caseId || !userId) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('documents', file));
        formData.append('status', status);
        formData.append('case_id', caseId);
        formData.append('user_id', userId); // You can omit this if your server gets it from token

        // try {
        //   const response = await axios.post('http://localhost:5000/api/documents/upload', formData);
        //   alert('Documents uploaded successfully!');
        //   console.log(response.data);
        // } catch (error) {
        //   console.error(error);
        //   alert('Upload failed.');
        // }
    };

    useEffect(() => {

        if (user?.role === "user") {
            setUserId(user.id as string);
            setStatus("Pending");
        }

    }, [user])

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

                    {user?.role !== "user" &&
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
                    }

                    <div>
                        <label className="block mb-1">Select Documents</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                            className="w-full"
                            required
                        />
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
