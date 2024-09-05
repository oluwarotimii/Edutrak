// src/components/GradingSystemModal.js
import React, { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const GradingSystemModal = ({ isOpen, onClose, gradingSystem }) => {
  const [formData, setFormData] = useState({
    A: '',
    B: '',
  });

  useEffect(() => {
    if (gradingSystem) {
      setFormData({
        A: gradingSystem.A || 70,
        B: gradingSystem.B || 60,
      });
    }
  }, [gradingSystem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, 'gradingSystems', 'default');
      await setDoc(ref, formData);
      onClose();
    } catch (error) {
      console.error('Error saving grading system:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Set Grading System</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">A (=)</label>
            <input
              type="number"
              name="A"
              value={formData.A}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">B (=)</label>
            <input
              type="number"
              name="B"
              value={formData.B}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default GradingSystemModal;
