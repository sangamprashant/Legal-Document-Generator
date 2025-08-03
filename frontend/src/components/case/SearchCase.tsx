import { useState } from 'react';
import { useAuth } from '../../providers/AuthenticationContext';
import PageHeader from '../banner/PageHeader';
import CaseIDHandle from './CaseIDHandle';

const SearchCase = () => {
    const { user } = useAuth();
    const title = user?.role === 'advocate' ? 'Search a Case' : 'Search My Cases';

    const [searchFields, setSearchFields] = useState({
        id: '',
    });

    const [searchKey, setSearchKey] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchFields(prev => ({ ...prev, [name]: value }));
        setSearchKey("")
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchKey(searchFields.id);
    };

    return (
        <>
            <PageHeader title={title} />

            <form
                onSubmit={handleSubmit}
                className="p-4 space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">Case ID</label>
                    <input
                        type="text"
                        name="id"
                        value={searchFields.id}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter case ID"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </form>

            {searchKey ? <CaseIDHandle id={searchKey} /> : <>
                <p className="text-center text-gray-500">Please enter a case ID to search.</p>
            </>}
        </>
    );
};

export default SearchCase;
