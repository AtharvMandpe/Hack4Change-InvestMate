import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'maker', // Default role is 'maker'
    username: ''   // Add username field
  });

  const { name, email, password, role, username } = formData;
  const navigate = useNavigate(); // useNavigate hook

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5002/api/users/register', formData);
      console.log(res.data);
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
      <select name="role" value={role} onChange={onChange}>
        <option value="maker">Maker</option>
        <option value="investor">Investor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
