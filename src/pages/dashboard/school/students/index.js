"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [studentForm, setStudentForm] = useState({
    id: '',
    name: '',
    admissionNumber: '',
    dateEnrolled: '',
    class: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const studentDoc = doc(db, 'students', studentForm.id);
      await updateDoc(studentDoc, {
        name: studentForm.name,
        admissionNumber: studentForm.admissionNumber,
        dateEnrolled: studentForm.dateEnrolled,
        class: studentForm.class,
      });
    } else {
      await addDoc(collection(db, 'students'), {
        name: studentForm.name,
        admissionNumber: studentForm.admissionNumber,
        dateEnrolled: studentForm.dateEnrolled,
        class: studentForm.class,
      });
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
              className="bg-white border border-gray-300 rounded px-4 py-2"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {isEditing ? 'Edit Student' : 'Add Student'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={studentForm.name}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Admission Number
                  </label>
                  <input
                    type="text"
                    value={studentForm.admissionNumber}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        admissionNumber: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Date Enrolled
                  </label>
                  <input
                    type="date"
                    value={studentForm.dateEnrolled}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        dateEnrolled: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:border-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Class
                  </label>
                  <select
                    value={studentForm.class}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, class: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:border-gray-400"
                  >
                    <option value="">Select Class</option>
                    {classes.map(classItem => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.className}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {isEditing ? 'Update' : 'Add'} Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
