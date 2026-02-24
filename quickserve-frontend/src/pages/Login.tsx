import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      
      const { token, role } = response.data; // Token සහ Role දෙකම ගන්නවා
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Role එකත් සේව් කරගමු
      
      alert("Login Successful!");

      // Role එක අනුව යවන Dashboard එක තීරණය කරනවා
      if (role === 'ROLE_PROVIDER') {
        navigate('/provider-dashboard');
      } else {
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      alert("Login Failed: " + (error.response?.data || "Invalid credentials"));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          <Button text="Sign In" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;