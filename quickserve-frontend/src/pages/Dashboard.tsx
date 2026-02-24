import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { createServiceRequest, getMyRequests } from '../services/taskService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [requests, setRequests] = useState<any[]>([]);

  // Function to load requests from Backend
  const fetchRequests = async () => {
    try {
      const response = await getMyRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Load requests when page opens
  useEffect(() => {
    fetchRequests(); 
    
    
    const interval = setInterval(() => {
        fetchRequests();
    }, 10000); 

    return () => clearInterval(interval); 
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createServiceRequest({ serviceType, description });
      alert("Request submitted successfully!");
      setServiceType(''); 
      setDescription('');
      fetchRequests(); // Refresh the list automatically
    } catch (error: any) {
      alert("Failed to submit request: " + (error.response?.data || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">QuickServe</h1>
        <button 
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600 font-medium transition-colors"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back!</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Form to Create Request */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">Request a Service</h3>
            <form onSubmit={handleCreateRequest} className="space-y-4">
              <Input 
                label="Service Type" 
                type="text" 
                placeholder="e.g. Plumbing, Cleaning" 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows={4}
                  placeholder="Describe your problem..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <Button text="Submit Request" />
            </form>
          </div>

          {/* Right Side: List of Requests */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">Your Recent Requests</h3>
            
            {requests.length === 0 ? (
              <div className="text-center py-10 text-gray-500 italic">
                No requests found. Start by creating one!
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req: any) => (
                  <div key={req.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50 flex justify-between items-center hover:shadow-sm transition-shadow">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{req.serviceType}</h4>
                      <p className="text-gray-600 text-sm mt-1">{req.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        req.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                        req.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;