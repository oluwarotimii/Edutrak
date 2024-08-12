import React from 'react';

const ManageTeachers = ({ teachers, onEdit, onDelete }) => {
  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    } else if (date && date.toDate) {
      return date.toDate().toLocaleDateString();
    } else if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return 'Invalid Date';
  };

  return (
    <div className="overflow-auto bg-white shadow my-2 rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-black">Name</th>
            <th className="py-2 px-4 text-black">Email</th>
            <th className="py-2 px-4 text-black">Phone</th>
            <th className="py-2 px-4 text-black">Classes</th>
            <th className="py-2 px-4 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="py-2 px-4">{teacher.name}</td>
              <td className="py-2 px-4">{teacher.email}</td>
              <td className="py-2 px-4">{teacher.phone}</td>
              <td className="py-2 px-4">
                {teacher.classes.join(', ')}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(teacher)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(teacher.id)}
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
  );
};

export default ManageTeachers;
