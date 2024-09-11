// src/components/AssessmentTypeModal.js
import React, { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AssessmentTypeModal = ({ isOpen, onClose, assessmentType }) => {
  const [formData, setFormData] = useState({
    name: '',
    maxScore: 100,
  });

  useEffect(() => {
    if (assessmentType) {
      setFormData({
        name: assessmentType.name || '',
        maxScore: assessmentType.maxScore || 100,
      });
    } else {
      setFormData({
        name: '',
        maxScore: 100,
      });
    }
  }, [assessmentType]);

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
      const ref = doc(db, 'assessmentTypes', assessmentType?.id || new Date().toISOString());
      await setDoc(ref, formData);
      alert('Assessment type saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving assessment type:', error);
      alert('Failed to save assessment type. Please try again.');
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl   text-gray-700 font-bold mb-4">
          {assessmentType ? 'Edit Assessment Type' : 'Add Assessment Type'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Max Score</label>
            <input
              type="number"
              name="maxScore"
              value={formData.maxScore}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              min="0"
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
              {assessmentType ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default AssessmentTypeModal;
