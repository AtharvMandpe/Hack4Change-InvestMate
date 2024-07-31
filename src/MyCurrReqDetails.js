import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyCurrReqDetails = () => {
  const { id } = useParams(); // Get the request ID from the URL parameters
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/details/${id}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request details:', error);
      }
    };

    fetchRequestDetails();
  }, [id]);

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Request Details</h3>
      <p><strong>Title:</strong> {request.title}</p>
      <p><strong>Sender:</strong> {request.senderName}</p>
      <p><strong>Receiver:</strong> {request.receiver}</p>
      <p><strong>Details:</strong> {request.details}</p>
      <p><strong>Status:</strong> {request.status}</p>
    </div>
  );
};

export default MyCurrReqDetails;
