import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProjects = ({ role }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const userRole = role || localStorage.getItem('role');

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.get('http://localhost:5002/api/projects', config);
      console.log('Projects Data:', res.data);
      setProjects(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching projects.');
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post(
        `http://localhost:5002/api/projects/${selectedProject._id}/bid`,
        { bidAmount },
        config
      );
      setSelectedProject(res.data);  // Update the project with the latest data including the new bid
      setBidAmount('');
    } catch (error) {
      console.error(error);
      alert('Error placing bid.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log('Role:', userRole); // Add this line to log the role
  }, [userRole]);

  return (
    <div>
      <h2>Projects</h2>
      {selectedProject ? (
        <div>
          <h3>{selectedProject.title}</h3>
          <p>{selectedProject.description}</p>
          <p>Invest Amount: {selectedProject.investAmount}</p>
          {userRole === 'investor' && (
            <form onSubmit={handleBidSubmit}>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Bid Amount"
                required
              />
              <button type="submit">Place Bid</button>
            </form>
          )}
          <button onClick={() => setSelectedProject(null)}>Back to Projects</button>
        </div>
      ) : (
        projects.map((project) => (
          <div key={project._id} onClick={() => handleProjectClick(project)} style={{ cursor: 'pointer' }}>
            <h3>{project.title}</h3>
            <p>Invest Amount: {project.investAmount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewProjects;
