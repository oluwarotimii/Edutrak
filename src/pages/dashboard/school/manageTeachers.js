import React, { useState } from 'react';

// Modal Component
const TeacherFormModal = ({ isOpen, onClose, onSubmit, teacher }) => {
  const [formData, setFormData] = useState({
    name: teacher?.name || '',
    subject: teacher?.subject || '',
    email: teacher?.email || '',
    address: teacher?.address || '',
    phone: teacher?.phone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{teacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
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
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
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
              {teacher ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

const ManageTeachers = ({ teachers, onAddTeacher, onEditTeacher, onDeleteTeacher }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const handleAddClick = () => {
    setCurrentTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (teacher) => {
    setCurrentTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentTeacher) {
      onEditTeacher(currentTeacher.id, formData);
    } else {
      onAddTeacher(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Manage Teachers</h2>
      <button
        onClick={handleAddClick}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Teacher
      </button>
      <div className="overflow-auto bg-white shadow my-2 rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-black">Name</th>
              <th className="py-2 px-4 text-black">Subject</th>
              <th className="py-2 px-4 text-black">Email</th>
              <th className="py-2 px-4 text-black">Address</th>
              <th className="py-2 px-4 text-black">Phone</th>
              <th className="py-2 px-4 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="py-2 px-4">{teacher.name}</td>
                <td className="py-2 px-4">{teacher.subject}</td>
                <td className="py-2 px-4">{teacher.email}</td>
                <td className="py-2 px-4">{teacher.address}</td>
                <td className="py-2 px-4">{teacher.phone}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEditClick(teacher)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTeacher(teacher.id)}
                    className="bg-red-500 text-white p-2 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Teacher */}
      <TeacherFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        teacher={currentTeacher}
      />
    </div>
  );
};

export default ManageTeachers;
