"use client";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/lib/firebase';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import '../../styles/globals.css';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if the school name is unique
  const isUniqueSchool = async (schoolName) => {
    try {
      const q = query(
        collection(db, 'schools'),
        where('schoolName', '==', schoolName)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.empty; // Returns true if no document found, meaning it's unique
    } catch (error) {
      console.error('Error checking school uniqueness:', error);
      throw error;
    }
  };

  // Register a new school and admin user
  const registerSchoolAndAdmin = async (email, password, schoolName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create school document
      const schoolRef = doc(db, 'schools', schoolName);
      await setDoc(schoolRef, {
        schoolName,
        createdAt: new Date(),
        biodataCompleted: false, // Flag to check if biodata is completed
      });

      // Store admin user data in Firestore under the school
      await setDoc(doc(schoolRef, 'users', newUser.uid), {
        email,
        schoolName,
        role: 'admin', // Default role for the creator
        createdAt: new Date(),
      });

      return newUser;
    } catch (error) {
      console.error('Error registering school and admin user:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Check for unique school name
      const isUnique = await isUniqueSchool(schoolName);
      if (!isUnique) {
        setError('School name already registered.');
        setLoading(false);
        return;
      }

      // Proceed with registration
      await registerSchoolAndAdmin(email, password, schoolName);
      router.push('/biodata'); // Redirect to biodata page after successful registration
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login page
  const toggleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Register</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Already have an account?{' '}
          <button onClick={toggleLogin} className="text-blue-900 hover:underline focus:outline-none">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
