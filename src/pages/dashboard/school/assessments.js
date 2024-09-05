// src/pages/dashboard/school/assessment.js
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/component/Sidebar';
import AssessmentTypeModal from '@/app/component/assementtype';
import GradingSystemModal from '@/app/component/gradingmodal';
import StudentProfileModal from '@/app/component/studentprofile';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import '@/styles/globals.css';

const AssessmentPage = () => {
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [gradingSystem, setGradingSystem] = useState({});
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showAssessmentTypeModal, setShowAssessmentTypeModal] = useState(false);
  const [showGradingSystemModal, setShowGradingSystemModal] = useState(false);
  const [showStudentProfileModal, setShowStudentProfileModal] = useState(false);

  useEffect(() => {
    const fetchAssessmentTypes = async () => {
      const snapshot = await getDocs(collection(db, 'assessmentTypes'));
      const types = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssessmentTypes(types);
    };

    const fetchGradingSystem = async () => {
      const ref = doc(db, 'gradingSystems', 'default');
      const snapshot = await getDoc(ref);
      setGradingSystem(snapshot.exists() ? snapshot.data() : {});
    };

    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students'));
      const studentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    };

    fetchAssessmentTypes();
    fetchGradingSystem();
    fetchStudents();
  }, []);

  const handleOpenAssessmentTypeModal = () => setShowAssessmentTypeModal(true);
  const handleCloseAssessmentTypeModal = () => setShowAssessmentTypeModal(false);

  const handleOpenGradingSystemModal = () => setShowGradingSystemModal(true);
  const handleCloseGradingSystemModal = () => setShowGradingSystemModal(false);

  const handleOpenStudentProfileModal = (student) => {
    setSelectedStudent(student);
    setShowStudentProfileModal(true);
  };
  const handleCloseStudentProfileModal = () => setShowStudentProfileModal(false);

  return (
    <div className="flex">
      <Sidebar role='admin'/>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Assessment Dashboard</h1>
        <div className="mb-4">
          <button onClick={handleOpenAssessmentTypeModal} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Add Assessment Type
          </button>
          <button onClick={handleOpenGradingSystemModal} className="bg-green-500 text-white px-4 py-2 rounded">
            Set Grading System
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Student:</label>
          <select
            onChange={(e) => {
              const student = students.find(student => student.id === e.target.value);
              handleOpenStudentProfileModal(student);
            }}
            className="p-2  width border border-gray-300 rounded"
          >
            <option value="">--Select a Student--</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </div>


        <h3 className='text-white'> Assesment Type</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className='text-gray-700'>
            <tr>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Max Score</th>
              
            </tr>
          </thead>
          <tbody>
            {assessmentTypes.map(type => (
              <tr key={type.id}>
                <td className="border-b p-2">{type.name}</td>
                <td className="border-b p-2">{type.maxScore}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <AssessmentTypeModal
          isOpen={showAssessmentTypeModal}
          onClose={handleCloseAssessmentTypeModal}
        />

        <GradingSystemModal
          isOpen={showGradingSystemModal}
          onClose={handleCloseGradingSystemModal}
          gradingSystem={gradingSystem}
        />

        {selectedStudent && (
          <StudentProfileModal
            isOpen={showStudentProfileModal}
            onClose={handleCloseStudentProfileModal}
            student={selectedStudent}
          />
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
