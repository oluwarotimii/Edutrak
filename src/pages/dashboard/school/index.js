"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SchoolDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [recentAttendance, setRecentAttendance] = useState(0);
  const [upcomingAssessments, setUpcomingAssessments] = useState(0);

  useEffect(() => {
    // Fetch total students
    const fetchStudents = async () => {
      const studentSnapshot = await getDocs(collection(db, 'students'));
      setTotalStudents(studentSnapshot.size);
    };

    // Fetch total teachers
    const fetchTeachers = async () => {
      const teacherSnapshot = await getDocs(collection(db, 'teachers'));
      setTotalTeachers(teacherSnapshot.size);
    };

    // Fetch recent attendance percentage
    const fetchAttendance = async () => {
      const attendanceSnapshot = await getDocs(collection(db, 'attendance'));
      const attendanceRecords = attendanceSnapshot.docs.map(doc => doc.data());
      const totalRecords = attendanceRecords.length;
      const presentRecords = attendanceRecords.filter(record => record.status === 'present').length;
      const attendancePercentage = totalRecords > 0 ? (presentRecords / totalRecords) * 100 : 0;
      setRecentAttendance(attendancePercentage.toFixed(2));
    };

    // Fetch upcoming assessments
    const fetchAssessments = async () => {
      const assessmentSnapshot = await getDocs(collection(db, 'assessments'));
      setUpcomingAssessments(assessmentSnapshot.size);
    };

    fetchStudents();
    fetchTeachers();
    fetchAttendance();
    fetchAssessments();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">School Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
  );
};

export default SchoolDashboard;
