// src/components/StudentProfileModal.js
import React from 'react';

const StudentProfileModal = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  if (!student) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-1/2">
          <p>Loading student profile...</p>
        </div>
      </div>
    );
  }

  const { name, assessments = [] } = student || {};

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Student Profile</h2>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        >
          Close
        </button>
        <h3 className="text-lg font-semibold">Name</h3>
        <p className="mb-4">{name}</p>

        <h3 className="text-lg font-semibold mt-4">Assessments</h3>
        {assessments.length > 0 ? (
          <ul>
            {assessments.map((assessment) => (
              <li key={assessment.id} className="mb-2">
                <strong>{assessment.type}</strong>: {assessment.score}/{assessment.maxScore}
              </li>
            ))}
          </ul>
        ) : (
          <p>No assessments available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfileModal;
