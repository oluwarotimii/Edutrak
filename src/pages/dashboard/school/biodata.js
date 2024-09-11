"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/app/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../../styles/globals.css';

const Biodata = () => {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [type, setType] = useState('mixed'); // Default type
  const [hasBoardingFacilities, setHasBoardingFacilities] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Update school document with biodata
      const schoolDocRef = doc(db, 'schools', schoolName);

      await setDoc(schoolDocRef, {
        address,
        phone,
        email,
        website,
        type,
        hasBoardingFacilities,
        additionalDetails,
        biodataCompleted: true, // Mark biodata as completed
        updatedAt: new Date(),
      }, { merge: true });

      router.push('/dashboard/school'); // Redirect to dashboard after successful submission
    } catch (error) {
      setError('Failed to save data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">School Biodata</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <input
            type="url"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          >
            <option value="mixed">Mixed</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasBoardingFacilities}
              onChange={(e) => setHasBoardingFacilities(e.target.checked)}
              className="mr-2"
            />
            Boarding Facilities
          </label>
          <textarea
            placeholder="Additional Details"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Biodata;
