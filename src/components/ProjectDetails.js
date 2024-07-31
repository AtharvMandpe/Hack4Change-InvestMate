// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ProjectDetails = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/project/${projectId}`);
//         setProject(response.data);
//       } catch (error) {
//         console.error('Error fetching project details', error);
//       }
//     };

//     fetchProjectDetails();
//   }, [projectId]);

//   const handleStatusChange = async (status) => {
//     try {
//       await axios.post(`http://localhost:5000/project/${projectId}/status`, { status });
//       alert(`Project ${status}`);
//       navigate('/received-projects'); // Redirect after status change
//     } catch (error) {
//       console.error('Error updating project status', error);
//     }
//   };

//   if (!project) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{project.name}</h2>
//       <p>{project.details}</p>
//       <p>Sent by: {project.collaborator}</p> {/* Display collaborator information */}
//       <button onClick={() => handleStatusChange('accepted')}>Accept</button>
//       <button onClick={() => handleStatusChange('rejected')}>Reject</button>
//     </div>
//   );
// };

// export default ProjectDetails;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { requestid } = useParams(); // Change from projectId to projectName
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/requests/${requestid}`);
        setRequest(response.data[0]);
      } catch (error) {
        console.error('Error fetching request details', error);
      }
    };

    fetchRequestDetails();
  }, [requestid]);

  const handleStatusChange = async (status) => {
    try {
      await axios.post(`http://localhost:5001/request/${request._id}/status`, { status });
      alert(`Request ${status}`);
      navigate('/received-projects'); // Redirect after status change
    } catch (error) {
      console.error('Error updating request status', error);
    }
  };
  
    console.log(request);

  if (!request) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">{request.projectName}</h2>
        <p className="mb-4 text-center">{request.pastProjects}</p>
        <p className="mb-4 text-center">Sent by: {request.senderName}</p>
        <p className="mb-4 text-center">Project Maker: {request.projectMakerName}</p>
        <p className="mb-4 text-center">Request Status: {request.status}</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleStatusChange('accepted')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

