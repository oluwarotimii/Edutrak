// components/CalendarForm.js
import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase'; 

const CalendarForm = ({ calendar, setIsEditing, type }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    if (calendar) {
      setName(calendar.name || '');
      setStartDate(calendar.startDate ? new Date(calendar.startDate.seconds * 1000).toISOString().substring(0, 10) : '');
      setEndDate(calendar.endDate ? new Date(calendar.endDate.seconds * 1000).toISOString().substring(0, 10) : '');
      if (type === 'session') {
        setTerms(calendar.terms || []);
      }
    }
  }, [calendar, type]);

  const handleSave = async () => {
    if (type === 'session') {
      if (calendar) {
        // Update existing session
        const calendarRef = doc(db, 'sessions', calendar.id);
        await updateDoc(calendarRef, {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          terms,
        });
      } else {
        // Add new session
        await addDoc(collection(db, 'sessions'), {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          terms,
        });
      }
    } else if (type === 'term') {
      if (calendar) {
        // Update existing term
        const termRef = doc(db, 'terms', calendar.id);
        await updateDoc(termRef, {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });
      } else {
        // Add new term
        await addDoc(collection(db, 'terms'), {
          sessionId: calendar.sessionId, // Ensure you provide the session ID
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{calendar ? `Edit ${type === 'session' ? 'Session' : 'Term'}` : `Add New ${type === 'session' ? 'Session' : 'Term'}`}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border  border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarForm;
