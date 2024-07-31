const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const Project = require('../models/Project');

// @route    POST api/projects
// @desc     Add a new project
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('investAmount', 'Invest Amount is required').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, investAmount } = req.body;

    try {
      const newProject = new Project({
        title,
        description,
        investAmount,
        user: req.user.id
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/projects
// @desc     Get all projects
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/:id/bid', auth, async (req, res) => {
  const { bidAmount } = req.body;
  
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Ensure bidAmount is a number and greater than zero
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({ msg: 'Invalid bid amount' });
    }

    // Add bid to the project
    project.bids.push({
      user: req.user.id,
      amount: bidAmount,
      date: new Date()
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
