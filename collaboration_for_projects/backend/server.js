const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB Atlas URI
const mongoURI = 'mongodb+srv://adityalad2004:adityalad2004@cluster0.ftfwq8v.mongodb.net/collaborationDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error', error);
  });

const domainSchema = new mongoose.Schema({
  domain: String,
  projects: [
    {
      name: String,
      description: String,
      details: String,
    },
  ],
});

const Domain = mongoose.model('Domain', domainSchema);

// Endpoint to fetch all domains
app.get('/domains', async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to fetch project details by project name
app.get('/project/:projectName', async (req, res) => {
  try {
    const { projectName } = req.params;
    const domain = await Domain.findOne({ 'projects.name': projectName });
    if (domain) {
      const project = domain.projects.find(p => p.name === projectName);
      res.json(project);
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
