import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthenticationContext';
import { apiRequest } from '../../utilities/apiRequest';
import { CaseStatus, STATUS_COLOR_MAP } from '../../utilities/case';
import PageHeader from '../banner/PageHeader';
import { Link } from 'react-router-dom';

type CaseType = {
    case_id: number;
    description: string;
    status: CaseStatus;
    user_id: number;
    case_from: string,
    case_to: string,
};

const ViewAllCase = () => {
    const [cases, setCases] = useState<CaseType[]>([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useAuth()

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await apiRequest({
                    url: '/cases',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(res)

                setCases(res.cases || []);
                console.log('Fetched cases:', res.data.cases);
            } catch (error) {
                console.error('Error fetching cases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    return (
        <>
            <PageHeader title={user?.role === "advocate" ? "All Cases" : "My cases"} />
            <div className="p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">User ID</th>
                                    <th className="border px-4 py-2 text-left">Case From</th>
                                    <th className="border px-4 py-2 text-left">Case To</th>
                                    <th className="border px-4 py-2 text-left">Description</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map((c) => (
                                    <tr key={c.case_id}>
                                        <td className="border px-4 py-2">{c.case_id}</td>
                                        <td className="border px-4 py-2">{c.user_id}</td>
                                        <td className="border px-4 py-2">{c.case_from}</td>
                                        <td className="border px-4 py-2">{c.case_to}</td>
                                        <td className="border px-4 py-2">{c.description}</td>
                                        <td className={`border px-4 py-2 text-center font-medium ${STATUS_COLOR_MAP[c.status as CaseStatus]}`}>{c.status}</td>
                                        <td className="border px-4 py-2 gap-1 flex flex-wrap">
                                            <Link to={`./${c.case_id}`} className='bg-indigo-900 hover:bg-indigo-950 text-white p-2 rounded shadow-2xl'>View</Link>
                                            <button className='bg-red-900 hover:bg-red-950 text-white p-2 rounded shadow-2xl'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewAllCase;
