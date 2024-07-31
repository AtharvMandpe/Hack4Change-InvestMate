import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DomainDropdown from './components/DomainDropdown';
import ProjectDetails from './components/ProjectDetails';
import SendRequest from './components/SendRequest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DomainDropdown />} />
        <Route path="/project/:projectName" element={<ProjectDetails />} />
        <Route path="/request/:projectName" element={<SendRequest />} />
      </Routes>
    </Router>
  );
};

export default App;
