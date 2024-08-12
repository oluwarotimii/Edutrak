import React from 'react';
import Sidebar from '@/app/component/Sidebar';

const DashboardLayout = ({ children, role }) => {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-8 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
