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

// // Schema to track projects and requests
// const projectSchema = new mongoose.Schema({
//   name: String,
//   details: String,
//   maker: String,
//   collaborator: String,
//   status: { type: String, default: 'pending' } // Status of the project request (optional)
// });

// const Project = mongoose.model('Project', projectSchema);

// // Endpoint to fetch projects sent by the current user
// app.get('/projects/sent', async (req, res) => {
//   try {
//     const currentUser = req.query.user || "default_maker"; // Replace with actual user identification logic
//     const projects = await Project.find({ maker: currentUser });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Endpoint to fetch projects received by the current user
// app.get('/projects/received', async (req, res) => {
//   try {
//     const currentUser = req.query.user || "default_collaborator"; // Replace with actual user identification logic
//     const projects = await Project.find({ projectMakerName: currentUser });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Endpoint to fetch detailed information about a specific project
// app.get('/project/:projectId', async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).send('Project not found');
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Endpoint to update project status (accept or reject)
// app.post('/project/:projectId/status', async (req, res) => {
//   try {
//     const { status } = req.body; // Expected to be 'accepted' or 'rejected'
//     const project = await Project.findByIdAndUpdate(req.params.projectId, { status }, { new: true });
//     if (project) {
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

// Schema for requests
const requestSchema = new mongoose.Schema({
  projectName: String,
  senderName: String,
  senderEmail: String,
  techStack: String,
  pastProjects: String,
  experience: String,
  additionalInfo: String,
  projectMakerName: String,
  status: { type: String, default: 'pending' }, // Add status field here
  createdAt: { type: Date, default: Date.now },
}, { collection: 'requests' });


const Request = mongoose.model('Request', requestSchema);

// Endpoint to fetch requests sent by the current user
app.get('/requests/sent', async (req, res) => {
  try {
    const currentUser = req.query.user || "default_sender"; // Replace with actual user identification logic
    const requests = await Request.find({ senderName: currentUser });
    res.json(requests);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Endpoint to fetch requests received by the current user
app.get('/requests/received', async (req, res) => {
  try {
    const currentUser = req.query.user || "default_maker"; // Replace with actual user identification logic
    const requests = await Request.find({ projectMakerName: currentUser });
    res.json(requests);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to fetch projects received by the current user
// app.get('/projects/received', async (req, res) => {
//   try {
//     const currentUser = req.query.user || "default_collaborator"; // Replace with actual user identification logic
//     const projects = await Project.find({ projectMakerName: currentUser });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// Endpoint to fetch detailed information about a specific request by project name
app.get('/requests/:requestid', async (req, res) => {
  try {
    const { requestid } = req.params;
    const request = await Request.find({ requestid });

    if (request) {
      res.json(request);
    } else {
      res.status(404).send('Request not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to update request status (accept or reject)
// Assuming status field is added to the Request schema or handled separately
app.post('/request/:requestId/status', async (req, res) => {
  try {
    const { status } = req.body; // Expected to be 'accepted' or 'rejected'
    const { requestId } = req.params;
    const request = await Request.findById(requestId);

    if (request) {
      // Update status if applicable, otherwise handle as per your logic
      request.status = status; // Make sure status field is defined in the schema if used
      await request.save();
      res.json(request);
    } else {
      res.status(404).send('Request not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/collabrequests/details/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).send('Request not found');
    }
    res.json(request);
  } catch (error) {
    console.error('Error fetching request details:', error);
    res.status(500).send('Error fetching request details');
  }
});

app.get('/fetchcollabrequestsforauser', async (req, res) => {
  const { senderName } = req.query; // Get senderName from query parameters

  if (!senderName) {
    return res.status(400).send('Sender name is required');
  }

  try {
    console.log(`Fetching requests for sender: ${senderName}...`);
    const requests = await Request.find({ senderName });
    console.log('Requests fetched:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
