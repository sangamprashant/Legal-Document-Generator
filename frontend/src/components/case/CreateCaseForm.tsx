import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/AuthenticationContext';
import { apiRequest } from '../../utilities/apiRequest';
import { CASE_STATUS, CaseStatus } from '../../utilities/case';

const ROLE = {
    ADVOCATE: 'advocate',
    USER: 'user',
};

interface User {
    id: number;
    name: string;
}

const CreateCaseForm = () => {
    const { user, token } = useAuth();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [description, setDescription] = useState<string>('');
    const [caseFrom, setCaseFrom] = useState<string>('');
    const [caseTo, setCaseTo] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [status, setStatus] = useState<CaseStatus>('Pending');
    const [loading, setLoading] = useState<boolean>(false);

    const isAdvocate = user?.role === ROLE.ADVOCATE;

    useEffect(() => {
        if (isAdvocate) {
            const fetchUsers = async () => {
                try {
                    const res = await apiRequest({
                        method: 'GET',
                        url: '/users/user',
                        token: token as string,
                    });
                    setUsers(res);
                } catch (error) {
                    console.error('Failed to fetch users');
                }
            };
            fetchUsers();
        }
    }, [isAdvocate, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const caseData = {
            user_id: isAdvocate ? selectedUserId : user?.id,
            status,
            case_from: caseFrom,
            case_to: caseTo,
            description,
        };

        try {
            setLoading(true);
            await apiRequest({
                method: 'POST',
                url: '/cases',
                token: token as string,
                data: caseData,
            });
            toast.success('Case created successfully!');
            setStatus("Pending");
            setCaseFrom('');
            setCaseTo('');
            setDescription('');
            setSelectedUserId(null);
        } catch (error) {
            console.error(error);
            toast.error('Failed to create case.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                {isAdvocate && (
                    <div>
                        <label className="block mb-1">Select User</label>
                        <select
                            required
                            className="w-full border px-3 py-2 rounded"
                            value={selectedUserId ?? ''}
                            onChange={(e) => setSelectedUserId(Number(e.target.value))}
                        >
                            <option value="" disabled>-- Select a user --</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as CaseStatus)}
                        className="border p-2 w-full rounded"
                    >
                        {!isAdvocate && <option value="Pending">Pending</option>}
                        {isAdvocate && CASE_STATUS.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Case From</label>
                    <input
                        type="text"
                        value={caseFrom}
                        onChange={(e) => setCaseFrom(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Case To</label>
                    <input
                        type="text"
                        value={caseTo}
                        onChange={(e) => setCaseTo(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        rows={4}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-950 w-full"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Case'}
                </button>
            </form>
        </div>
    );
};

export default CreateCaseForm;
