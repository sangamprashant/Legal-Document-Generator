import {
  HiOutlineDocumentText,
  HiOutlineFolderOpen,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineBriefcase
} from 'react-icons/hi';
import { useAuth } from '../../../providers/AuthenticationContext';
import { toast } from 'react-toastify';
import { apiRequest } from '../../../utilities/apiRequest';
import { useEffect, useState } from 'react';

type Role = 'user' | 'advocate';

interface UserDashboardResult {
  total_cases: number;
  pending_docs: number;
  resolved_cases: number;
}

interface AdvocateDashboardResult {
  total_clients: number;
  cases_in_progress: number;
  docs_reviewed: number;
}

const Stats = () => {
  const { user, token } = useAuth();
  const role = user?.role as Role;

  const [data, setData] = useState<UserDashboardResult | AdvocateDashboardResult | undefined>();

  const fetchStats = async () => {
    try {
      const res = await apiRequest({
        method: 'GET',
        url: '/dashboard',
        token: token as string
      });
      setData(res.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (role && token) fetchStats();
  }, [role, token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {role === 'user' && data && (
        <>
          {/* Documents Generated */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <HiOutlineDocumentText size={40} className="text-blue-500" />
            <div>
              <p className="text-gray-500">My Documents</p>
              <h3 className="text-xl font-bold">{(data as UserDashboardResult).pending_docs}</h3>
            </div>
          </div>

          {/* Cases Filed */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <HiOutlineFolderOpen size={40} className="text-green-500" />
            <div>
              <p className="text-gray-500">Cases Filed</p>
              <h3 className="text-xl font-bold">{(data as UserDashboardResult).total_cases}</h3>
            </div>
          </div>

          {/* Advocate Meetings */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <HiOutlineUserGroup size={40} className="text-yellow-500" />
            <div>
              <p className="text-gray-500">Resolved Cases</p>
              <h3 className="text-xl font-bold">{(data as UserDashboardResult).resolved_cases}</h3>
            </div>
          </div>
        </>
      )}

      {role === 'advocate' && data && (
        <>
          {/* Clients Served */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <HiOutlineUserGroup size={40} className="text-blue-500" />
            <div>
              <p className="text-gray-500">Clients Served</p>
              <h3 className="text-xl font-bold">{(data as AdvocateDashboardResult).total_clients}</h3>
            </div>
          </div>

          {/* Cases Active */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <HiOutlineBriefcase size={40} className="text-green-500" />
            <div>
              <p className="text-gray-500">Active Cases</p>
              <h3 className="text-xl font-bold">{(data as AdvocateDashboardResult).cases_in_progress}</h3>
            </div>
          </div>

          {/* Documents Prepared */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <HiOutlineClipboardList size={40} className="text-yellow-500" />
            <div>
              <p className="text-gray-500">Documents Prepared</p>
              <h3 className="text-xl font-bold">{(data as AdvocateDashboardResult).docs_reviewed}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
