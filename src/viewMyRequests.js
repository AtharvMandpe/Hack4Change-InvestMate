// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewMyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const currentUser = 'mandpe22'; // Replace with the actual username you want to hardcode

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/fetchrequestsforauser?senderName=${currentUser}`);
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleRequestClick = (request) => {
//     setSelectedRequest(request);
//   };

//   return (
//     <div>
//       <h2>My Requests</h2>
//       <ul>
//         {requests.map((request) => (
//           <li key={request._id}>
//             <button onClick={() => handleRequestClick(request)}>
//               {request.title}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {selectedRequest && (
//         <div>
//           <h3>Request Details</h3>
//           <p><strong>Title:</strong> {selectedRequest.title}</p>
//           <p><strong>Sender:</strong> {selectedRequest.senderName}</p>
//           <p><strong>Receiver:</strong> {selectedRequest.receiver}</p>
//           <p><strong>Details:</strong> {selectedRequest.details}</p>
//           <p><strong>Status:</strong> {selectedRequest.status}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewMyRequests;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ViewMyRequests = () => {
  const [requests, setRequests] = useState([]);
  const currentUser = 'noopur malse'; // Replace with the actual username you want to hardcode
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetchrequestsforauser?senderName=${currentUser}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestClick = (id) => {
    navigate(`/requests/details/${id}`); // Navigate to details page
  };

  return (
    <div>
      <h2>My Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <button onClick={() => handleRequestClick(request._id)}>
              {request.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMyRequests;
