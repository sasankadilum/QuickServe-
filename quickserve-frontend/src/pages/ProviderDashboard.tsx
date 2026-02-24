import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [availableRequests, setAvailableRequests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search සඳහා අලුත් state එකක්

  const fetchAvailable = async () => {
    try {
      const response = await API.get('/services/available');
      setAvailableRequests(response.data);
    } catch (error) {
      console.error("Error fetching available jobs:", error);
    }
  };

  useEffect(() => {
    fetchAvailable();
    // තත්පර 15කට වරක් අලුත් ජොබ් තියෙනවාද බලන්න (Polling)
    const interval = setInterval(fetchAvailable, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAccept = async (requestId: string) => {
    try {
      await API.put(`/services/update-status/${requestId}?status=ACCEPTED`);
      alert("Success: You have accepted this job!");
      fetchAvailable();
    } catch (error) {
      alert("Error: Could not accept the job.");
    }
  };

  // Search logic: නම හෝ විස්තරය අනුව Filter කිරීම
  const filteredRequests = availableRequests.filter(job => 
    job.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Improved Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">QuickServe Provider</h1>
        <div className="flex items-center gap-6">
          <Link to="/profile" className="text-gray-600 hover:text-green-600 font-medium">Profile</Link>
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-medium">Logout</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Available Jobs</h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              placeholder="Search jobs (e.g. Plumbing)..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequests.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 italic">No matching jobs found.</p>
            </div>
          ) : (
            filteredRequests.map((job: any) => (
              <div key={job.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xl text-gray-800">{job.serviceType}</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">NEW</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{job.description}</p>
                </div>
                <button 
                  onClick={() => handleAccept(job.id)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
                >
                  Accept Job
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;