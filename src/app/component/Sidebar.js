import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../../styles/globals.css';

const Sidebar = ({ role }) => {
  const router = useRouter();

  // Define the menu items based on the role
  const menuItems = role === 'admin' ? [
    { name: 'Overview', path: '/dashboard/school' },
    { name: 'Manage Students', path: '/dashboard/school/students' },
    { name: 'Manage Teachers', path: '/dashboard/school/teachers' },
    { name: 'Manage Class', path: '/dashboard/school/students/classes' },
    { name: 'Academic Calendar', path: '/dashboard/school/calendar' },
    { name: 'Attendance', path: '/dashboard/school/attendance' },
    { name: 'Assessments', path: '/dashboard/school/assessments' },
    { name: 'Reports', path: '/dashboard/school/reports' }
  ] : [
    { name: 'Overview', path: '/dashboard/teacher' },
    { name: 'My Classes', path: '/dashboard/teacher/classes' },
    { name: 'Attendance', path: '/dashboard/teacher/attendance' },
    { name: 'Assessments', path: '/dashboard/teacher/assessments' }
  ];

  // Set the title based on the role
  const dashboardTitle = role === 'admin' ? "Admin Dashboard" : "Teacher's Dashboard";

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
      <h2 className="text-3xl font-extrabold mb-10 text-gray-100">{dashboardTitle}</h2>
      <ul className="flex-1">
        {menuItems.map((item) => (
          <li key={item.name} className="mb-3">
            <Link 
              href={item.path} 
              className={`block p-3 rounded-lg transition duration-300 ease-in-out 
                ${router.pathname === item.path ? 'bg-gray-800 text-blue-300' : 'hover:bg-gray-700 hover:text-blue-300'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
