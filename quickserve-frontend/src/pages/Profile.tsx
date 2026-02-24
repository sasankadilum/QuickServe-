import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-20 text-gray-600">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg">
          {user.fullName.charAt(0)}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">{user.fullName}</h2>
        <p className="text-blue-600 font-medium mt-1">{user.role}</p>
        
        <div className="mt-8 space-y-4 text-left bg-gray-50 p-6 rounded-2xl">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <p className="text-gray-700 font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Status</label>
            <p className="text-green-600 font-bold flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;