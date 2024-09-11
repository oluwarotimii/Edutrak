"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import StudentModal from '@/app/component/studentmodal';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [studentForm, setStudentForm] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const studentSnapshot = await getDocs(collection(db, 'students'));
      const studentList = studentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };

    const fetchClasses = async () => {
      const classSnapshot = await getDocs(collection(db, 'classes'));
      const classList = classSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };

    fetchStudents();
    fetchClasses();
  }, []);

  const handleAddStudent = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setStudentForm({
      id: '',
      name: '',
      admissionNumber: '',
      dateEnrolled: '',
      class: '',
    });
  };

  const handleEditStudent = (student) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setStudentForm({
      id: student.id,
      name: student.name,
      admissionNumber: student.admissionNumber,
      dateEnrolled: student.dateEnrolled,
      class: student.class,
    });
  };

  const handleSubmit = async (formData) => {
    if (isEditing) {
      const studentDoc = doc(db, 'students', formData.id);
      await updateDoc(studentDoc, formData);
    } else {
      await addDoc(collection(db, 'students'), formData);
    }

    setIsModalOpen(false);
    // Fetch the updated list of students
    const studentSnapshot = await getDocs(collection(db, 'students'));
    const studentList = studentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  const filteredStudents = students.filter(student =>
    selectedClass ? student.class === selectedClass : true
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddStudent}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Student
            </button>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-white border text-gray-700 border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select Class</option>
              {classes.map(classItem => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.className}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Admission Number</th>
                <th className="px-4 py-2">Date Enrolled</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.admissionNumber}</td>
                  <td className="border px-4 py-2">{student.dateEnrolled}</td>
                  <td className="border px-4 py-2">
                    {classes.find(cls => cls.id === student.class)?.className}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <StudentModal
            isEditing={isEditing}
            studentForm={studentForm}
            classes={classes}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
