'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ManageTeachers from './manageTeachers';

const TeachersDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      const teacherSnapshot = await getDocs(collection(db, 'teachers'));
      const teacherList = teacherSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(teacherList);
    };

    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    // Implement edit functionality
    console.log('Edit teacher:', teacher);
    // You might want to set a state here to open a modal for editing the teacher details
  };

  const handleDelete = async (teacherId) => {
    try {
      await deleteDoc(doc(db, 'teachers', teacherId));
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <ManageTeachers
          teachers={teachers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setAddTeacherOpen={setAddTeacherOpen}
        />
      </div>
    </div>
  );
};

export default TeachersDashboard;
