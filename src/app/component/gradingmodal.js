// src/components/GradingSystemModal.js
import React, { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const GradingSystemModal = ({ isOpen, onClose, gradingSystem }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (gradingSystem) {
      // Assuming gradingSystem is an object where keys are grade names and values are score ranges
      setFormData(gradingSystem || {});
    }
  }, [gradingSystem]);

  const handleChange = (e, grade) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [grade]: { ...formData[grade], [name]: value },
    });
  };

  const handleAddGrade = () => {
    const newGrade = `Grade ${Object.keys(formData).length + 1}`;
    setFormData({
      ...formData,
      [newGrade]: { min: '', max: '' },
    });
  };

  const handleRemoveGrade = (grade) => {
    const updatedData = { ...formData };
    delete updatedData[grade];
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, 'gradingSystems', 'default');
      await setDoc(ref, formData);
      alert('Grading system updated successfully!');
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
          {Object.keys(formData).map((grade) => (
            <div key={grade} className="mb-4">
              <label className="block text-gray-700">{grade} (Min Score)</label>
              <input
                type="number"
                name="min"
                value={formData[grade].min}
                onChange={(e) => handleChange(e, grade)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700 mt-2">Max Score</label>
              <input
                type="number"
                name="max"
                value={formData[grade].max}
                onChange={(e) => handleChange(e, grade)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveGrade(grade)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove Grade
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddGrade}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Grade
          </button>
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
