"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { PlusIcon } from '@heroicons/react/24/solid';

// Reusable Card Component
const Card = ({ title, onClick }) => {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-blue-100" 
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <PlusIcon className="h-6 w-6 text-gray-700" />
      </div>
    </div>
  );
};

const SchoolDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [recentAttendance, setRecentAttendance] = useState(0);
  const [upcomingAssessments, setUpcomingAssessments] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentSnapshot = await getDocs(collection(db, 'students'));
        setTotalStudents(studentSnapshot.size);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const teacherSnapshot = await getDocs(collection(db, 'teachers'));
        setTotalTeachers(teacherSnapshot.size);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchAttendance = async () => {
      try {
        const attendanceSnapshot = await getDocs(collection(db, 'attendance'));
        const attendanceRecords = attendanceSnapshot.docs.map(doc => doc.data());
        const totalRecords = attendanceRecords.length;
        const presentRecords = attendanceRecords.filter(record => record.status === 'present').length;
        const attendancePercentage = totalRecords > 0 ? (presentRecords / totalRecords) * 100 : 0;
        setRecentAttendance(attendancePercentage.toFixed(2));
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    const fetchAssessments = async () => {
      try {
        const assessmentSnapshot = await getDocs(collection(db, 'assessments'));
        setUpcomingAssessments(assessmentSnapshot.size);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchStudents();
    fetchTeachers();
    fetchAttendance();
    fetchAssessments();
  }, []);

  // Define card data in an array
  const createOptions = [
    { title: "Create Grade", onClick: () => console.log('Create Grade') },
    { title: "Create Assessment", onClick: () => console.log('Create Assessment') },
    { title: "Create Teacher", onClick: () => console.log('Create Teacher') },
    { title: "Create Student", onClick: () => console.log('Create Student') },
    { title: "Create Class", onClick: () => console.log('Create Class') }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">School Admin Dashboard</h1>

        {/* Existing Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Total Students</h2>
            <p className="text-gray-700 text-3xl">{totalStudents}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Total Teachers</h2>
            <p className="text-gray-700 text-3xl">{totalTeachers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
            <p className="text-gray-700 text-3xl">{recentAttendance}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upcoming Assessments</h2>
            <p className="text-gray-700 text-3xl">{upcomingAssessments}</p>
          </div>
        </div>

        {/* New Cards for Creating Grades, Assessments, Teachers, Students, and Classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createOptions.map((option, index) => (
            <Card key={index} title={option.title} onClick={option.onClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
