"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import Sidebar from '@/app/component/Sidebar';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [classForm, setClassForm] = useState({
    id: '',
    className: '',
    teacher: '',
  });

  useEffect(() => {
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

  const handleAddClass = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setClassForm({
      id: '',
      className: '',
      teacher: '',
    });
  };

  const handleEditClass = (classItem) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setClassForm({
      id: classItem.id,
      className: classItem.className,
      teacher: classItem.teacher,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const classDoc = doc(db, 'classes', classForm.id);
      await updateDoc(classDoc, {
        className: classForm.className,
        teacher: classForm.teacher,
      });
    } else {
      await addDoc(collection(db, 'classes'), {
        className: classForm.className,
        teacher: classForm.teacher,
      });
    }

    setIsModalOpen(false);
    // Fetch the updated list of classes
    const classSnapshot = await getDocs(collection(db, 'classes'));
    const classList = classSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setClasses(classList);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Classes</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleAddClass}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Class
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="px-4 py-2">Class Name</th>
                <th className="px-4 py-2">Class Teacher</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {classes.map(classItem => (
                <tr key={classItem.id}>
                  <td className="border px-4 py-2">{classItem.className}</td>
                  <td className="border px-4 py-2">{classItem.teacher}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditClass(classItem)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Edit
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
                {isEditing ? 'Edit Class' : 'Add Class'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={classForm.className}
                    onChange={(e) =>
                      setClassForm({ ...classForm, className: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Class Teacher
                  </label>
                  <input
                    type="text"
                    value={classForm.teacher}
                    onChange={(e) =>
                      setClassForm({ ...classForm, teacher: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-gray-700"
                  />
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
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    {isEditing ? 'Update' : 'Add'} Class
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

export default ManageClasses;
