// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Replace with your MongoDB Atlas URI
// const mongoURI = 'mongodb+srv://adityalad2004:adityalad2004@cluster0.ftfwq8v.mongodb.net/collaborationDB?retryWrites=true&w=majority';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Connection error', error);
//   });

// const domainSchema = new mongoose.Schema({
//   domain: String,
//   projects: [
//     {
//       name: String,
//       description: String,
//       details: String,
//     },
//   ],
// });

// const Domain = mongoose.model('Domain', domainSchema);

// // Endpoint to fetch all domains
// app.get('/domains', async (req, res) => {
//   try {
//     const domains = await Domain.find();
//     res.json(domains);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Endpoint to fetch project details by project name
// app.get('/project/:projectName', async (req, res) => {
//   try {
//     const { projectName } = req.params;
//     const domain = await Domain.findOne({ 'projects.name': projectName });
//     if (domain) {
//       const project = domain.projects.find(p => p.name === projectName);
//       res.json(project);
//     } else {
//       res.status(404).send('Project not found');
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Replace with your MongoDB Atlas URI
// const mongoURI = 'mongodb+srv://adityalad2004:adityalad2004@cluster0.ftfwq8v.mongodb.net/collaborationDB?retryWrites=true&w=majority';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Connection error', error);
//   });

// const domainSchema = new mongoose.Schema({
//   domain: String,
//   projects: [
//     {
//       name: String,
//       description: String,
//       details: String,
//     },
//   ],
// });

// const Domain = mongoose.model('Domain', domainSchema);

// // New schema and model for requests
// const requestSchema = new mongoose.Schema({
//   projectName: String,
//   senderName: String,
//   senderEmail: String,
//   techStack: String,
//   pastProjects: String,
//   experience: String,
//   additionalInfo: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Request = mongoose.model('Request', requestSchema);

// // Endpoint to fetch all domains
// app.get('/domains', async (req, res) => {
//   try {
//     const domains = await Domain.find();
//     res.json(domains);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Endpoint to fetch project details by project name
// app.get('/project/:projectName', async (req, res) => {
//   try {
//     const { projectName } = req.params;
//     const domain = await Domain.findOne({ 'projects.name': projectName });
//     if (domain) {
//       const project = domain.projects.find(p => p.name === projectName);
//       res.json(project);
//     } else {
//       res.status(404).send('Project not found');
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Endpoint to handle sending request
// app.post('/send-request', async (req, res) => {
//   try {
//     const { projectName, name, email, techStack, pastProjects, experience, additionalInfo } = req.body;
//     const newRequest = new Request({
//       projectName,
//       senderName: name,
//       senderEmail: email,
//       techStack,
//       pastProjects,
//       experience,
//       additionalInfo,
//     });
//     await newRequest.save();
//     res.status(201).send('Request saved successfully');
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



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

// Schema and model for domains and projects
const domainSchema = new mongoose.Schema({
  domain: String,
  projects: [
    {
      name: String,
      description: String,
      details: String,
      makerName: String, // Store maker's name
      makerEmail: String, // Store maker's email
    },
  ],
});

const Domain = mongoose.model('Domain', domainSchema);

// Schema and model for requests
const requestSchema = new mongoose.Schema({
  projectName: String,
  senderName: String,
  senderEmail: String,
  techStack: String,
  pastProjects: String,
  experience: String,
  additionalInfo: String,
  projectMakerName: String, // Add project maker's name to request
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model('Request', requestSchema);

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

// Endpoint to fetch the project maker's name by project name
app.get('/project-maker/:projectName', async (req, res) => {
  try {
    const { projectName } = req.params;
    const domain = await Domain.findOne({ 'projects.name': projectName });

    if (domain) {
      const project = domain.projects.find(p => p.name === projectName);
      if (project) {
        res.json({ makerName: project.makerName });
      } else {
        res.status(404).send('Project not found');
      }
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


// Endpoint to handle sending request
app.post('/send-request', async (req, res) => {
  try {
    const { projectName, name, email, techStack, pastProjects, experience, additionalInfo, projectMakerName } = req.body;

    // Check if all required fields are present
    if (!projectName || !name || !email || !techStack || !pastProjects || !experience || !projectMakerName) {
      return res.status(400).send('Missing required fields');
    }

    // Create a new request
    const newRequest = new Request({
      projectName,
      senderName: name,
      senderEmail: email,
      techStack,
      pastProjects,
      experience,
      additionalInfo,
      projectMakerName, // Include project maker's name
    });

    // Save the request to the database
    await newRequest.save();
    res.status(201).send('Request saved successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
