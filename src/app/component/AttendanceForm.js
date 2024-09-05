// src/app/component/AttendanceForm.js

import React, { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

const AttendanceForm = ({ termId, classId, date, setIsOpen }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students'));
      const studentList = snapshot.docs
        .filter(doc => doc.data().classId === classId)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };
    
    fetchStudents();
  }, [classId]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    try {
      const attendanceDoc = doc(db, 'attendance', `${termId}-${classId}-${date.toISOString().split('T')[0]}`);
      await setDoc(attendanceDoc, {
        termId,
        classId,
        date,
        attendance,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Mark Attendance</h3>
        <div>
          {students.map(student => (
            <div key={student.id} className="flex items-center mb-2">
              <span className="mr-4">{student.name}</span>
              <select
                value={attendance[student.id] || 'absent'}
                onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                className="p-2 border rounded"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
          <button onClick={() => setIsOpen(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
