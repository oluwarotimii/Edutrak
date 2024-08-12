// components/SessionForm.js
import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const SessionForm = ({ sessionId, onClose, sessionData }) => {
  const [name, setName] = useState(sessionData?.name || '');
  const [startDate, setStartDate] = useState(sessionData?.startDate.toDate().toISOString().split('T')[0] || '');
  const [endDate, setEndDate] = useState(sessionData?.endDate.toDate().toISOString().split('T')[0] || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionId) {
      // Update existing session
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, { name, startDate: new Date(startDate), endDate: new Date(endDate) });
    } else {
      // Add new session
      await addDoc(collection(db, 'sessions'), { name, startDate: new Date(startDate), endDate: new Date(endDate), terms: [] });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-gray-700 font-bold">{sessionId ? 'Edit Session' : 'Add Session'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Session Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border text-gray-700 border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 text-gray-700 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 text-gray-700 rounded w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
          <button type="button" onClick={onClose} className="ml-2 py-2 px-4 rounded  text-gray-700 border border-gray-300">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;
