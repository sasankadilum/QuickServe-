import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_CLIENT');
  const navigate = useNavigate();

 const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await registerUser({ fullName, email, password, role });
        alert("Registration Successful!");
        navigate('/login');
    } catch (error: any) {
        alert("Registration Failed: " + (error.response?.data || "Something went wrong"));
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
        
        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <Input 
            label="Full Name" 
            type="text" 
            placeholder="John Doe" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="email@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700">I want to be a:</label>
            <select 
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ROLE_CLIENT">Client (I need help)</option>
              <option value="ROLE_PROVIDER">Provider (I want to work)</option>
            </select>
          </div>

          <Button text="Register" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;