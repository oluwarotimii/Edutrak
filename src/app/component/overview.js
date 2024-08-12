"use client";
import React from 'react';

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold">Total Students</h3>
        <p className="text-2xl mt-2">1200</p> {/* Replace with dynamic data */}
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold">Total Teachers</h3>
        <p className="text-2xl mt-2">75</p> {/* Replace with dynamic data */}
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold">Recent Attendance</h3>
        <p className="text-2xl mt-2">95%</p> {/* Replace with dynamic data */}
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold">Upcoming Assessments</h3>
        <ul className="list-disc pl-5">
          <li>Math Test - Sept 10</li> {/* Replace with dynamic data */}
          <li>Science Assignment - Sept 12</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold">Recent Activity</h3>
        <ul className="list-disc pl-5">
          <li>John Doe marked as present</li> {/* Replace with dynamic data */}
          <li>New teacher added</li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
