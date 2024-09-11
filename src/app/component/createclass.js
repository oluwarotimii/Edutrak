import React from 'react';

const ClassModal = ({ isOpen, onClose, onSubmit, classForm, setClassForm, isEditing }) => {
  // Ensure that classForm is not undefined before accessing its properties
  const { className = '', teacher = '' } = classForm || {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {isEditing ? 'Edit Class' : 'Create Class'}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Class Name
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassForm({ ...classForm, className: e.target.value })}
              required
              className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Class Teacher
            </label>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setClassForm({ ...classForm, teacher: e.target.value })}
              required
              className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              {isEditing ? 'Update Class' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassModal;
