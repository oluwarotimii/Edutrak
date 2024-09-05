import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { app } from '@/app/lib/firebase';

const AttendanceForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [currentClassStudents, setCurrentClassStudents] = useState([]);

  useEffect(() => {
    const fetchClassesAndStudents = async () => {
      const db = getFirestore(app);
      try {
        // Fetch classes
        const classesSnapshot = await getDocs(collection(db, 'classes'));
        setClasses(classesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));

        // Fetch students
        const studentsSnapshot = await getDocs(collection(db, 'students'));
        setStudents(studentsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, classId: doc.data().classId })));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchClassesAndStudents();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const filteredStudents = students.filter(student => student.classId === selectedClass);
      setCurrentClassStudents(filteredStudents);
    } else {
      setCurrentClassStudents([]);
    }
  }, [selectedClass, students]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    try {
      await Promise.all(
        Object.keys(attendance).map(async (studentId) => {
          await setDoc(doc(db, 'attendance', `${date}_${studentId}`), {
            date,
            studentId,
            status: attendance[studentId]
          });
        })
      );
      alert('Attendance recorded successfully!');
      onSubmit(); // Notify parent component to fetch updated data
    } catch (error) {
      console.error('Error recording attendance: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="class">Class:</label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="" disabled>Select class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>

      {currentClassStudents.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-black">Student Name</th>
                <th className="py-2 px-4 text-black">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {currentClassStudents.map(student => (
                <tr key={student.id}>
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">
                    <select
                      value={attendance[student.id] || ''}
                      onChange={(e) => setAttendance(prev => ({ ...prev, [student.id]: e.target.value }))}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default AttendanceForm;
