"use client";
import '../../styles/globals.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase'; // Update this import path if necessary

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard/school'); // Redirect to the dashboard after successful login
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const toggleRegister = () => {
    router.push('/auth');
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="mt-6 text-center text-black"> Don't have an account?{' '}
          <button
            onClick={toggleRegister}
            className="text-blue-900 hover:underline focus:outline-none"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
