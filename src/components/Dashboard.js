import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = ({ role }) => {
  const [userRole, setUserRole] = useState(role || localStorage.getItem('role'));

  useEffect(() => {
    if (!userRole) {
      const savedRole = localStorage.getItem('role');
      if (savedRole) {
        setUserRole(savedRole);
      }
    }
  }, [userRole]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Navbar />
      {userRole === 'maker' ? (
        <div>
          <Link to="/add-project">Add Project</Link>
          <Link to="/view-projects">View Projects</Link>
        </div>
      ) : userRole === 'investor' ? (
        <div>
          <Link to="/view-projects">View All Projects</Link>
        </div>
      ) : (
        <div>Please log in to see your dashboard.</div>
      )}
    </div>
  );
};

export default Dashboard;
