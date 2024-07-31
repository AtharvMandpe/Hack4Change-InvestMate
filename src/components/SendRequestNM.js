// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SendRequestNM = () => {
//   const { projectName } = useParams();
//   const [project, setProject] = useState(null);
//   const [requestInfo, setRequestInfo] = useState({
//     name: '',
//     email: '',
//     techStack: '',
//     pastProjects: '',
//     experience: '',
//     additionalInfo: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5003/project/${projectName}`);
//         setProject(response.data);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     };
//     fetchProject();
//   }, [projectName]);

//   const validateForm = () => {
//     const errors = {};
//     if (!requestInfo.name) errors.name = 'Name is required';
//     if (!requestInfo.email) errors.email = 'Email is required';
//     if (!requestInfo.techStack) errors.techStack = 'Tech stack is required';
//     if (!requestInfo.pastProjects) errors.pastProjects = 'Past projects are required';
//     if (!requestInfo.experience) errors.experience = 'Experience is required';
//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRequestInfo({ ...requestInfo, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length) {
//       setFormErrors(errors);
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:5003/send-request`, { projectName, ...requestInfo });
//       setLoading(false);
//       alert('Request sent successfully');
//       navigate('/success');
//     } catch (error) {
//       setLoading(false);
//       console.error('Error sending request:', error);
//       alert('Failed to send request');
//     }
//   };

//   const handleConfirm = (e) => {
//     e.preventDefault();
//     setShowConfirmation(true);
//   };

//   const handleCloseConfirmation = () => {
//     setShowConfirmation(false);
//   };

//   const handleConfirmSubmit = () => {
//     setShowConfirmation(false);
//     handleSubmit();
//   };

//   if (!project) {
//     return <div className="text-white text-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-4xl font-bold mb-6 text-center text-gradient">{project.name}</h1>
//         <h2 className="text-2xl font-semibold mb-4 text-center">{project.makerName}</h2>
//         <p className="mb-4 text-center">{project.makerEmail}</p>

//         <form onSubmit={handleConfirm} className="space-y-4">
//           <label className="block">
//             Your Name:
//             <input 
//               type="text" 
//               name="name" 
//               value={requestInfo.name} 
//               onChange={handleChange} 
//               className="bg-gray-700 text-white p-2 rounded w-full mt-2"
//             />
//             {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
//           </label>
//           <label className="block">
//             Your Email:
//             <input 
//               type="email" 
//               name="email" 
//               value={requestInfo.email} 
//               onChange={handleChange} 
//               className="bg-gray-700 text-white p-2 rounded w-full mt-2"
//             />
//             {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
//           </label>
//           <label className="block">
//             Tech Stack:
//             <input 
//               type="text" 
//               name="techStack" 
//               value={requestInfo.techStack} 
//               onChange={handleChange} 
//               className="bg-gray-700 text-white p-2 rounded w-full mt-2"
//             />
//             {formErrors.techStack && <p className="text-red-500 text-sm">{formErrors.techStack}</p>}
//           </label>
//           <label className="block">
//             Past Projects:
//             <textarea 
//               name="pastProjects" 
//               value={requestInfo.pastProjects} 
//               onChange={handleChange} 
//               className="bg-gray-700 text-white p-2 rounded w-full mt-2"
//             ></textarea>
//             {formErrors.pastProjects && <p className="text-red-500 text-sm">{formErrors.pastProjects}</p>}
//           </label>
//           <label className="block">
//             Experience:
//             <textarea 
//               name="experience" 
//               value={requestInfo.experience} 
//               onChange={handleChange} 
//               className="bg-gray-700 text-white p-2 rounded w-full mt-2"
//             ></textarea>
//             {formErrors.experience && <p className="text-red-500 text-sm">{formErrors.experience}</p>}
//           </label>
//           <label className="block">
//             Additional Information:
//             <textarea 
//               name="additionalInfo" 
//               value={requestInfo.additionalInfo} 
//               onChange={handleChange} 
//               className="bg-gray-700 text-white p-2 rounded w-full mt-2"
//             ></textarea>
//           </label>

//           <button 
//             type="submit" 
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 transition duration-300"
//           >
//             {loading ? 'Sending...' : 'Send Request'}
//           </button>
//         </form>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//           <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
//             <h2 className="text-xl font-semibold mb-4 text-white">Confirm Your Request</h2>
//             <p className="text-gray-400 mb-6">Are you sure you want to send this request?</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleConfirmSubmit}
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Yes, Send
//               </button>
//               <button
//                 onClick={handleCloseConfirmation}
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendRequestNM;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SendRequestNM = () => {
  const { projectName } = useParams();

  console.log(projectName);
  const [project, setProject] = useState(null);
  const [requestInfo, setRequestInfo] = useState({
    name: '',
    email: '',
    techStack: '',
    pastProjects: '',
    experience: '',
    additionalInfo: '',
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/project/${projectName}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchProject();
  }, [projectName]);

  const validateForm = () => {
    const errors = {};
    if (!requestInfo.name) errors.name = 'Name is required';
    if (!requestInfo.email) errors.email = 'Email is required';
    if (!requestInfo.techStack) errors.techStack = 'Tech stack is required';
    if (!requestInfo.pastProjects) errors.pastProjects = 'Past projects are required';
    if (!requestInfo.experience) errors.experience = 'Experience is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestInfo({ ...requestInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Ensure this is called
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`http://localhost:5003/send-request`, { 
        projectName, 
        ...requestInfo, 
        projectMakerName: project.makerName // Include project maker's name
      });
      setLoading(false);
      alert('Request sent successfully');
      navigate('/success');
    } catch (error) {
      setLoading(false);
      console.error('Error sending request:', error);
      alert('Failed to send request');
    }
  };
  

  const handleConfirm = (e) => {
    e.preventDefault();  // Ensure this is called
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();  // Ensure this is called
    setShowConfirmation(false);
    handleSubmit(e); // Ensure event is passed if required
  };

  if (!project) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient">{project.name}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">{project.makerName}</h2>
        <p className="mb-4 text-center">{project.makerEmail}</p>

        <form onSubmit={handleConfirm} className="space-y-4">
          <label className="block">
            Your Name:
            <input 
              type="text" 
              name="name" 
              value={requestInfo.name} 
              onChange={handleChange} 
              className="bg-gray-700 text-white p-2 rounded w-full mt-2"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </label>
          <label className="block">
            Your Email:
            <input 
              type="email" 
              name="email" 
              value={requestInfo.email} 
              onChange={handleChange} 
              className="bg-gray-700 text-white p-2 rounded w-full mt-2"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </label>
          <label className="block">
            Tech Stack:
            <input 
              type="text" 
              name="techStack" 
              value={requestInfo.techStack} 
              onChange={handleChange} 
              className="bg-gray-700 text-white p-2 rounded w-full mt-2"
            />
            {formErrors.techStack && <p className="text-red-500 text-sm">{formErrors.techStack}</p>}
          </label>
          <label className="block">
            Past Projects:
            <textarea 
              name="pastProjects" 
              value={requestInfo.pastProjects} 
              onChange={handleChange} 
              className="bg-gray-700 text-white p-2 rounded w-full mt-2"
            ></textarea>
            {formErrors.pastProjects && <p className="text-red-500 text-sm">{formErrors.pastProjects}</p>}
          </label>
          <label className="block">
            Experience:
            <textarea 
              name="experience" 
              value={requestInfo.experience} 
              onChange={handleChange} 
              className="bg-gray-700 text-white p-2 rounded w-full mt-2"
            ></textarea>
            {formErrors.experience && <p className="text-red-500 text-sm">{formErrors.experience}</p>}
          </label>
          <label className="block">
            Additional Information:
            <textarea 
              name="additionalInfo" 
              value={requestInfo.additionalInfo} 
              onChange={handleChange} 
              className="bg-gray-700 text-white p-2 rounded w-full mt-2"
            ></textarea>
          </label>

          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 transition duration-300"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Confirm Your Request</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to send this request?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Send
              </button>
              <button
                onClick={handleCloseConfirmation}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendRequestNM;
