"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import Sidebar from '@/app/component/Sidebar';
import ClassModal from '@/app/component/createclass';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [classForm, setClassForm] = useState({
    id: '',
    className: '',
    teacher: '',
  });

  // Fetch classes from Firestore when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      const classSnapshot = await getDocs(collection(db, 'classes'));
      const classList = classSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };

    fetchClasses();
  }, []);

  // Function to handle opening the "Add Class" modal
  const handleAddClass = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setClassForm({
      id: '',
      className: '',
      teacher: '',
    });
  };

  // Function to handle opening the "Edit Class" modal with pre-filled values
  const handleEditClass = (classItem) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setClassForm({
      id: classItem.id,
      className: classItem.className,
      teacher: classItem.teacher,
    });
  };

  // Function to handle form submission for adding or editing a class
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update the class if editing
      const classDoc = doc(db, 'classes', classForm.id);
      await updateDoc(classDoc, {
        className: classForm.className,
        teacher: classForm.teacher,
      });
    } else {
      // Add a new class
      await addDoc(collection(db, 'classes'), {
        className: classForm.className,
        teacher: classForm.teacher,
      });
    }

    // Close the modal and refresh the class list
    setIsModalOpen(false);
    const classSnapshot = await getDocs(collection(db, 'classes'));
    const classList = classSnapshot.docs.map((doc) => ({
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
              {classes.map((classItem) => (
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

        {/* ClassModal component */}
        <ClassModal
          isOpen={isModalOpen}
          isEditing={isEditing}
          classForm={classForm}
          setClassForm={setClassForm}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ManageClasses;
