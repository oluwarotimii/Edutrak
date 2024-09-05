import React, { useState } from 'react';


const ManageAttendance = ({ students, onSaveAttendance }) => {
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = '';
      return acc;
    }, {})
  );

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSubmit = () => {
    onSaveAttendance(attendance);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Manage Attendance</h2>
      <div className="overflow-auto bg-white shadow my-2 rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-black">Student Name</th>
              <th className="py-2 px-4 text-black">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleAttendanceChange(student.id, 'present')}
                    className={`p-2 rounded ${attendance[student.id] === 'present' ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(student.id, 'absent')}
                    className={`p-2 rounded ${attendance[student.id] === 'absent' ? 'bg-red-500' : 'bg-gray-300'}`}
                  >
                    ✗
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(student.id, 'late')}
                    className={`p-2 rounded ${attendance[student.id] === 'late' ? 'bg-yellow-500' : 'bg-gray-300'}`}
                  >
                    ⧗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default ManageAttendance;
