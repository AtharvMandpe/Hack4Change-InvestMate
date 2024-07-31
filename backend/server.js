// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// app.use(cors({ origin: '*' }));
// app.use(express.json());

// mongoose.connect('mongodb+srv://adityalad2004:adityalad2004@cluster0.ftfwq8v.mongodb.net/labRequests?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// const requestSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     details: {
//       sender: String,
//       requirements: String
//     },
//     status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' }
//   }, { collection: 'lab' });

// const Request = mongoose.model('Request', requestSchema);

// app.get('/requests', async (req, res) => {
//   try {
//     console.log('Fetching requests...');
//     const requests = await Request.find();
//     console.log('Requests fetched:', requests);
//     res.json(requests);
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).send(error.message);
//   }
// });

// // Route to update the status of a request
// app.patch('/requests/:id', async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
  
//     if (!['ACCEPTED', 'REJECTED'].includes(status)) {
//       return res.status(400).send('Invalid status');
//     }
  
//     try {
//       const updatedRequest = await Request.findByIdAndUpdate(id, { status }, { new: true });
//       if (!updatedRequest) {
//         return res.status(404).send('Request not found');
//       }
//       res.json(updatedRequest);
//     } catch (error) {
//       console.error('Error updating request status:', error);
//       res.status(500).send('Error updating request status');
//     }
//   });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://adityalad2004:adityalad2004@cluster0.ftfwq8v.mongodb.net/labRequests?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Request Schema
const requestSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  receiver: { type: String, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' }
}, {collection: 'lab'});

const Request = mongoose.model('Request', requestSchema);

// Lab Schema
const labSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { collection: 'labData' });

const Lab = mongoose.model('Lab', labSchema);


// Endpoint to fetch requests for a specific user
app.get('/fetchrequestsforauser', async (req, res) => {
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


// Endpoint to fetch all labs
app.get('/labs', async (req, res) => {
  try {
    console.log('Fetching labs...');
    const labs = await Lab.find();
    console.log('Labs fetched:', labs);
    res.json(labs);
  } catch (error) {
    console.error('Error fetching labs:', error);
    res.status(500).send(error.message);
  }
});

// Endpoint to fetch all requests for lab
app.get('/fetchrequests', async (req, res) => {
  try {
    console.log('Fetching requests...');
    const requests = await Request.find();
    console.log('Requests fetched:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).send(error.message);
  }
});

// Endpoint to create a new request
app.post('/requests', async (req, res) => {
  try {
    const { senderName, title, receiver, details } = req.body;
    const newRequest = new Request({
      senderName,
      receiver,
      title,
      details,
      status: 'PENDING'
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).send(error.message);
  }
});

// Endpoint to update the status of a request
app.patch('/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['ACCEPTED', 'REJECTED'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  try {
    const updatedRequest = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedRequest) {
      return res.status(404).send('Request not found');
    }
    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).send('Error updating request status');
  }
});


// Endpoint to view details of a request
app.get('/requests/details/:id', async (req, res) => {
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
