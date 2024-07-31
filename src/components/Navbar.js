// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role, setRole }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole('');
  };

  const role2 = localStorage.getItem('role');
console.log(role2);
  return (
    <nav>
      <ul>
        {!role2 ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {role2 === 'maker' && (
              <>
                <li>
                  <Link to="/collaborations">Collab Requests</Link>
                </li>
                <li>
                  <Link to="/domainDropdown">Send Collab Requests</Link>
                </li>
                <li>
                  <Link to="/add-project">Add Project</Link>
                </li>
                <li>
                  <Link to="/view-projects">View Projects</Link>
                </li>
                <li>
                  <Link to="/sendReq">Send Request to Lab</Link>
                </li>
              </>
            )}
            {role2 === 'investor' && (
              <>
                <li>
                  <Link to="/view-projects">View Projects</Link>
                </li>
              </>
            )}
            {role2 === 'lab' && (
              <>
                <li>
                  <Link to="/viewMyRequests">View My Requests</Link>
                </li>
                <li>
                  <Link to="/requests/details/:id">Request Details</Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
