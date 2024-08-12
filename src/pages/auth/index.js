"use client";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/lib/firebase';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDoc, setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import '../../styles/globals.css';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');

  const isUniqueSchoolAndEmail = async (email, schoolName) => {
    const q = query(
      collection(db, 'users'),
      where('email', '==', email),
      where('schoolName', '==', schoolName)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // Returns true if no document found, meaning it's unique
  };

  const register = async (email, password, schoolName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        email,
        schoolName,
      });

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Check for unique email and school name
      const isUnique = await isUniqueSchoolAndEmail(email, schoolName);
      if (!isUnique) {
        setError('Email or school name already registered.');
        return;
      }

      // Proceed with registration
      await register(email, password, schoolName);
      router.push('/dashboard/school'); // Redirect to dashboard after successful registration
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  const toggleLogin = () => {
    router.push('/auth/login'); // Navigate to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-white p-8 rounded shadow-lg w-96">
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
            className="w-full bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-black transition duration-200"
          >
            Register
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
