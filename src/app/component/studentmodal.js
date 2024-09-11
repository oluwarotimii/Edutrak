import React, { useState, useEffect } from 'react';

const StudentModal = ({ isOpen, onClose, onSubmit, student, isEditing }) => {
  // Initialize form state with default values
  const [form, setForm] = useState({
    name: '',
    age: '',
    class: '',
    // Add other fields as needed
  });

  useEffect(() => {
    if (student) {
      setForm(student);
    } else {
      setForm({
        name: '',
        age: '',
        class: '',
        // Reset to default values
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name || ''}  // Ensure value is defined
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              value={form.age || ''}  // Ensure value is defined
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="class">Class</label>
            <input
              id="class"
              type="text"
              name="class"
              value={form.class || ''}  // Ensure value is defined
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
            />
          </div>
          {/* Add other fields as needed */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isEditing ? 'Update' : 'Add'} Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
