"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/component/Sidebar';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { PlusIcon } from '@heroicons/react/24/solid';
import GradingSystemModal from '@/app/component/gradingmodal';
import AssessmentTypeModal from '@/app/component/assementtype';
import TeacherFormModal from '@/app/component/addteacher';
import StudentModal from '@/app/component/studentmodal';
import ClassModal from '@/app/component/createclass';

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
  const [gradingSystem, setGradingSystem] = useState({});
  const [students, setStudents] = useState([]);
  const [showGradingSystemModal, setShowGradingSystemModal] = useState(false);
  const [showAssessmentTypeModal, setShowAssessmentTypeModal] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [isEditingClass, setIsEditingClass] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentSnapshot = await getDocs(collection(db, 'students'));
        setTotalStudents(studentSnapshot.size);
        const studentList = studentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);
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

    const fetchGradingSystem = async () => {
      try {
        const assessmentSnapshot = await getDocs(collection(db, 'assessmentTypes'));
        const types = assessmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAssessmentTypes(types);

        const gradingRef = doc(db, 'gradingSystems', 'default');
        const gradingSnapshot = await getDoc(gradingRef);
        setGradingSystem(gradingSnapshot.exists() ? gradingSnapshot.data() : {});
      } catch (error) {
        console.error('Error fetching grading system:', error);
      }
    };

    fetchStudents();
    fetchTeachers();
    fetchAttendance();
    fetchAssessments();
    fetchGradingSystem();
  }, []);

  const handleAddTeacherClick = () => {
    setCurrentTeacher(null);
    setIsTeacherModalOpen(true);
    setIsEditingTeacher(false);
  };

  const handleAddStudentClick = () => {
    setCurrentStudent(null);
    setIsStudentModalOpen(true);
    setIsEditingStudent(false);
  };
  
  const handleStudentFormSubmit = async (formData) => {
    if (isEditingStudent && currentStudent) {
      const studentDoc = doc(db, 'students', currentStudent.id);
      await updateDoc(studentDoc, formData);
    } else {
      await addDoc(collection(db, 'students'), formData);
    }
    setIsStudentModalOpen(false);
    // Fetch updated student list
    const studentSnapshot = await getDocs(collection(db, 'students'));
    const studentList = studentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
    setTotalStudents(studentList.length);
  };
  

  const handleOpenGradingSystemModal = () => setShowGradingSystemModal(true);
  const handleCloseGradingSystemModal = () => setShowGradingSystemModal(false);
  const handleOpenAssessmentTypeModal = () => setShowAssessmentTypeModal(true);
  const handleCloseAssessmentTypeModal = () => setShowAssessmentTypeModal(false);

  const handleTeacherFormSubmit = async (formData) => {
    if (currentTeacher) {
      const teacherDoc = doc(db, 'teachers', currentTeacher.id);
      await updateDoc(teacherDoc, formData);
    } else {
      await addDoc(collection(db, 'teachers'), formData);
    }
    setIsTeacherModalOpen(false);
    // Fetch the updated list of teachers
    const teacherSnapshot = await getDocs(collection(db, 'teachers'));
    setTotalTeachers(teacherSnapshot.size);
  };
  const handleAddClassClick = () => {
    setCurrentClass(null); // Reset class data for new class
    setIsClassModalOpen(true);
    setIsEditingClass(false);
  };

  // Function to handle form submit (add or edit class)
  const handleClassFormSubmit = async (formData) => {
    if (isEditingClass && currentClass) {
      const classDoc = doc(db, 'classes', currentClass.id);
      await updateDoc(classDoc, formData);
    } else {
      await addDoc(collection(db, 'classes'), formData);
    }
    setIsClassModalOpen(false);
    // Fetch updated class list
    const classSnapshot = await getDocs(collection(db, 'classes'));
    setClasses(classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };


  

  const createOptions = [
    { title: "Create Grade", onClick: handleOpenGradingSystemModal },
    { title: "Create Assessment", onClick: handleOpenAssessmentTypeModal },
    { title: "Create Teacher", onClick: handleAddTeacherClick },
    { title: "Create Student", onClick: handleAddStudentClick },
    { title: "Create Class", onClick:  handleAddClassClick}
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

      <AssessmentTypeModal
        isOpen={showAssessmentTypeModal}
        onClose={handleCloseAssessmentTypeModal}
      />
      <GradingSystemModal
        isOpen={showGradingSystemModal}
        onClose={handleCloseGradingSystemModal}
      />
      <TeacherFormModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        onSubmit={handleTeacherFormSubmit}
        teacher={currentTeacher}
        isEditing={isEditingTeacher}
      />
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSubmit={handleStudentFormSubmit}
        student={currentStudent}
        isEditing={isEditingStudent}
      />

<ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onSubmit={handleClassFormSubmit}
        classData={currentClass}
        isEditing={isEditingClass}
      />
    </div>
  );
};

export default SchoolDashboard;
