import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyCurrCollabReqDetails = () => {
  const { id } = useParams(); // Get the request ID from the URL parameters
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/collabrequests/details/${id}`);
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

  console.log(request);

  return (
    <div>
      <h3>Request Details</h3>
      <p><strong>projectName:</strong> {request.projectName}</p>
      <p><strong>projectMakerName:</strong> {request.projectMakerName}</p>
      {/* <p><strong>Receiver:</strong> {request.receiver}</p>
      <p><strong>Details:</strong> {request.details}</p>
      <p><strong>Status:</strong> {request.status}</p> */}
    </div>
  );
};

export default MyCurrCollabReqDetails;