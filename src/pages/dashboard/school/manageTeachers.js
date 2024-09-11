import React, { useState } from 'react';
import TeacherFormModal from '@/app/component/addteacher';


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
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Manage Teachers</h2>
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
