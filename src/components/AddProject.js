import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [investAmount, setInvestAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const body = { title, description, investAmount };
      await axios.post('http://localhost:5002/api/projects', body, config);
      alert('Project added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding project.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={investAmount}
        onChange={(e) => setInvestAmount(e.target.value)}
        placeholder="Invest Amount"
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;
