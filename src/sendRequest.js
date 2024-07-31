// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SendRequest = () => {
//   const [labs, setLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState('');
//   const [senderName, setSenderName] = useState('');
//   const [details, setDetails] = useState('');
//   const [status, setStatus] = useState('PENDING');

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/labs');
//         setLabs(response.data);
//       } catch (error) {
//         console.error('Error fetching labs', error);
//       }
//     };

//     fetchLabs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const requestData = {
//         senderName,
//         receiver: selectedLab,
//         details,
//         status
//       };
//       await axios.post('http://localhost:5000/requests', requestData);
//       alert('Request sent successfully!');
//       // Clear the form
//       setSenderName('');
//       setSelectedLab('');
//       setDetails('');
//     } catch (error) {
//       console.error('Error sending request', error);
//     }
//   };

//   console.log(labs);

//   return (
//     <div>
//       <h2>Send Request</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Sender Name:</label>
//           <input
//             type="text"
//             value={senderName}
//             onChange={(e) => setSenderName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Select Lab:</label>
//           <select
//             value={selectedLab}
//             onChange={(e) => setSelectedLab(e.target.value)}
//             required
//           >
//             <option value="" disabled>Select a lab</option>
//             {labs.map((lab) => (
//               <option key={lab._id} value={lab.name}>
//                 {lab.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Details:</label>
//           <textarea
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div>
//           <button type="submit">Send Request</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SendRequest;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendRequest = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [senderName, setSenderName] = useState('');
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs', error);
      }
    };

    fetchLabs();
  }, []);

  const handleLabSelect = (labName) => {
    setSelectedLab(labName);
    setCurrentStep(2); // Move to step two after selecting a lab
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        senderName,
        receiver: selectedLab,
        title,
        details,
        status
      };
      await axios.post('http://localhost:5000/requests', requestData);
      alert('Request sent successfully!');
      // Clear the form
      setSenderName('');
      setSelectedLab('');
      setDetails('');
      setTitle('');
      setCurrentStep(1); // Reset to step one after submission
    } catch (error) {
      console.error('Error sending request', error);
    }
  };

  return (
    <div>
      <h2>Send Request</h2>
      {currentStep === 1 && (
        <div>
          <h3>Select a Lab</h3>
          <ul>
            {labs.map((lab) => (
              <li key={lab._id} onClick={() => handleLabSelect(lab.name)}>
                {lab.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <button onClick={() => setCurrentStep(1)}>Back</button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Sender Name:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Selected Lab:</label>
              <input type="text" value={selectedLab} readOnly />
            </div>
            <div>
              <label>Details:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <button type="submit">Send Request</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SendRequest;
