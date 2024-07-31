// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const SentProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [user, setUser] = useState('alice'); // Replace with actual user logic

//   useEffect(() => {
//     const fetchSentProjects = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/projects/sent?user=${user}`);
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching sent projects', error);
//       }
//     };

//     fetchSentProjects();
//   }, [user]);

//   return (
//     <div>
//       <h2>Sent Projects</h2>
//       <ul>
//         {projects.map(project => (
//           <li key={project._id}>
//             <h3>{project.name}</h3>
//             <p>{project.details}</p>
//             <p>Sent to: {project.collaborator}</p>
//             <Link to={`/project/${project._id}`}>
//               <button>View Details</button>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SentProjects;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const SentProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [user, setUser] = useState('alice'); // Replace with actual user logic

//   useEffect(() => {
//     const fetchSentProjects = async () => {
//       try {
//         // Fetch projects where the logged-in user is the maker
//         const response = await axios.get(`http://localhost:5000/projects/received?user=${user}`);
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching sent projects', error);
//       }
//     };

//     fetchSentProjects();
//   }, [user]);

//   return (
//     <div>
//       <h2>Sent Projects</h2>
//       <ul>
//         {projects
//           .filter(project => project.collaborator === user) // Filter out projects based on the collaborator
//           .map(project => (
//             <li key={project._id}>
//               <h3>{project.name}</h3>
//               <p>{project.details}</p>
//               <p>Sent to: {project.maker}</p>
//               <Link to={`/project/${project._id}`}>
//                 <button>View Details</button>
//               </Link>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   );
// };

// export default SentProjects;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SentProjects = () => {
  const [projects, setProjects] = useState([]);
  const user = localStorage.getItem('name'); // Replace with actual user logic
console.log('user');
  useEffect(() => {
    const fetchSentProjects = async () => {
      try {
        // Fetch projects where the logged-in user is the sender
        const response = await axios.get(`http://localhost:5001/projects/sent?user=${user}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching sent projects', error);
      }
    };

    fetchSentProjects();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Sent Projects</h2>
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">{project.projectName}</h3>
            <p className="mb-2">Details: {project.additionalInfo || 'No additional information provided'}</p>
            <p className="mb-4">Sent to: {project.projectMakerName}</p>
            <Link to={`/project/${project._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentProjects;
