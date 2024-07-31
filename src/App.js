// // App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import RequestDetails from './RequestDetails';
// import './my.css';

// function App() {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/requests')
//       .then(response => setRequests(response.data))
//       .catch(error => console.error('Error fetching requests:', error));
//   }, []);

//   return (
//     <Router>
//       <div>
//         <h1>Lab Requests</h1>
//         <Routes>
//           <Route exact path="/" element={
//             <ul>
//               {requests.map(request => (
//                 <li key={request._id}>
//                   <Link to={`/request/${request._id}`}>{request.title}</Link>
//                 </li>
//               ))}
//             </ul>
//           } />
//           <Route path="/request/:requestId" element={<RequestDetails requests={requests} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RequestDetails from './RequestDetails';
import './my.css';
import ViewMyRequests from './viewMyRequests';
import MyCurrReqDetails from './MyCurrReqDetails';
import SendRequest from './sendRequest';
import ViewMyCollabRequests from './components/ViewMyCollabRequests';
import ViewCollaborations from './components/ViewCollaborations';
import MyCurrCollabReqDetails from './components/MyCurrCollabReqDetails';
import ProjectDetails from './components/ProjectDetails';
import RecievedProjects from './components/RecievedRequest';
import RequestsSent from './components/RequestsSent';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import AddProject from './components/AddProject';
import ViewProjects from './components/ViewProjects';
import ProjectDetailsCollab from './components/ProjectDetailsCollab';
import DomainDropdown from './components/DomainDropdown';
import SendRequestNM from './components/SendRequestNM';
import Navbar from './components/Navbar';

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/fetchrequests')
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  const [role, setRole] = useState(localStorage.getItem('role') || '');

  return (
    <Router>
      <div>

        <Routes>
          {/* ithe lab la alelya saglya requests disnr */}
          {/* <Route exact path="/" element={
            <ul>
              {requests.map(request => (
                <li key={request._id}>
                  <Link to={`/request/${request._id}`} style={{ textDecoration: 'none' }}>
                    <button>{request.title}</button>
                  </Link>
                </li>
              ))}
            </ul>
          } /> */}

          <Route path='/' element={<Navbar/>} />


          <Route path="/request/:requestId" element={<RequestDetails requests={requests} />} />

          <Route path="/viewMyRequests" element={<ViewMyRequests />}/>
          <Route path="/requests/details/:id" element={<MyCurrReqDetails />}/>
          <Route path="/sendReq" element={<SendRequest />}/>

          <Route path="/collaborations" element={<ViewCollaborations />} />
          <Route path="/sent-projects" element={<RequestsSent />} />
          <Route path="/received-projects" element={<RecievedProjects />} />
          <Route path="/requests/:requestid" element={<ProjectDetails />} />

          <Route path="/viewMyCollabRequests" element={<ViewMyCollabRequests />}/>
          <Route path="/collabrequests/details/:id" element={<MyCurrCollabReqDetails />}/>


          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/view-projects" element={<ViewProjects />} />
          

          <Route path="/domainDropdown" element={<DomainDropdown />} />
        <Route path="/project/:projectName" element={<ProjectDetailsCollab />} />
        <Route path="/requestt/:projectName" element={<SendRequestNM />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
