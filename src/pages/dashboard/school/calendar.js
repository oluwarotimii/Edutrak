// src/pages/dashboard/school/calendar.js
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import SessionForm from '@/app/component/sessionform';
import TermForm from '@/app/component/termform';

const CalendarPage = () => {
  const [sessions, setSessions] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showTermForm, setShowTermForm] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [editingTerm, setEditingTerm] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionSnapshot = await getDocs(collection(db, 'sessions'));
      const sessionList = sessionSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(sessionList);
    };

    const fetchTerms = async () => {
      const termSnapshot = await getDocs(collection(db, 'terms'));
      const termList = termSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTerms(termList);
    };

    fetchSessions();
    fetchTerms();
  }, []);

  const handleAddSession = () => {
    setEditingSession(null);
    setShowSessionForm(true);
  };

  const handleEditSession = (session) => {
    setEditingSession(session);
    setShowSessionForm(true);
  };

  const handleAddTerm = (sessionId) => {
    setSelectedSessionId(sessionId);
    setEditingTerm(null);
    setShowTermForm(true);
  };

  const handleEditTerm = (term) => {
    setEditingTerm(term);
    setShowTermForm(true);
  };

  const handleCloseSessionForm = () => setShowSessionForm(false);
  const handleCloseTermForm = () => setShowTermForm(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Academic Calendar</h1>
        <div className="mb-6">
          <button
            onClick={handleAddSession}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Session
          </button>
        </div>
        {sessions.map(session => (
          <div key={session.id} className="mb-6 p-4 border border-gray-300 rounded">
            <h2 className="text-xl  text-gray-700 font-semibold">{session.name}</h2>
            <p className='text-gray-700'>Start Date: {new Date(session.startDate.toDate()).toLocaleDateString()}</p>
            <p className='text-gray-700'>End Date: {new Date(session.endDate.toDate()).toLocaleDateString()}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEditSession(session)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit Session
              </button>
              <button
                onClick={() => handleAddTerm(session.id)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Term
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg text-gray-700 font-semibold">Terms/Semesters</h3>
              {terms.filter(term => term.sessionId === session.id).map(term => (
                <div key={term.id} className="mt-2 p-2 border border-gray-200 rounded">
                  <p className='text-gray-900 '>{term.name}</p>
                  <p className='text-gray-700'>Start Date: {new Date(term.startDate.toDate()).toLocaleDateString()}</p>
                  <p className='text-gray-700'>End Date: {new Date(term.endDate.toDate()).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleEditTerm(term)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mt-2"
                  >
                    Edit Term
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {showSessionForm && (
          <SessionForm
            sessionId={editingSession?.id}
            onClose={handleCloseSessionForm}
            sessionData={editingSession}
          />
        )}
        {showTermForm && (
          <TermForm
            termId={editingTerm?.id}
            sessionId={selectedSessionId}
            onClose={handleCloseTermForm}
            termData={editingTerm}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
