import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const AttendancePage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Fetch all classes
    const fetchClasses = async () => {
      const classSnapshot = await getDocs(collection(db, 'classes'));
      const classList = classSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    // Fetch students when a class is selected
    const fetchStudents = async () => {
      if (selectedClass) {
        const studentQuery = query(collection(db, 'students'), where('classId', '==', selectedClass));
        const studentSnapshot = await getDocs(studentQuery);
        const studentList = studentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);

        const initialAttendance = studentList.reduce((acc, student) => {
          acc[student.id] = '';
          return acc;
        }, {});
        setAttendance(initialAttendance);
      } else {
        setStudents([]);
        setAttendance({});
      }
    };

    fetchStudents();
  }, [selectedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSaveAttendance = async () => {
    try {
      const batch = db.batch();
      Object.entries(attendance).forEach(([studentId, status]) => {
        const studentDoc = doc(db, 'students', studentId);
        batch.update(studentDoc, { attendanceStatus: status });
      });
      await batch.commit();
      alert('Attendance saved successfully');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Failed to save attendance');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Attendance</h1>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-700 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" className='text-gray-700'>-- Select a class --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

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
                      aria-label="Mark Present"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`p-2 rounded ${attendance[student.id] === 'absent' ? 'bg-red-500' : 'bg-gray-300'}`}
                      aria-label="Mark Absent"
                    >
                      ✗
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                      className={`p-2 rounded ${attendance[student.id] === 'late' ? 'bg-yellow-500' : 'bg-gray-300'}`}
                      aria-label="Mark Late"
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
            onClick={handleSaveAttendance}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
