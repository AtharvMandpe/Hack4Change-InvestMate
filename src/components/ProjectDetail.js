import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDetail = ({ match }) => {
  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${match.params.id}`);
        setProject(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [match.params.id]);

  const handleInvestment = async () => {
    // Handle the investment logic here
    console.log(`Invested amount: ${amount}`);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Amount: {project.amount}</p>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Investment Amount" />
      <button onClick={handleInvestment}>Invest</button>
    </div>
  );
};

export default ProjectDetail;
