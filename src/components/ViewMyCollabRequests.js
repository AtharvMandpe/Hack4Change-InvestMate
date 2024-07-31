import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ViewMyCollabRequests = () => {
  const [requests, setRequests] = useState([]);
  const currentUser = localStorage.getItem('name'); // Replace with the actual username you want to hardcode
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/fetchcollabrequestsforauser?senderName=${currentUser}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestClick = (id) => {
    navigate(`/collabrequests/details/${id}`); // Navigate to details page
  };

  return (
    <div>
      <h2>My Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <button onClick={() => handleRequestClick(request._id)}>
              {request.projectName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMyCollabRequests;