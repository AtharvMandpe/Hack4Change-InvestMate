const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, amount } = req.body;
    const project = new Project({ title, description, amount, creator: req.user.id });
    await project.save();
    res.status(201).send({ message: 'Project created successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('creator', 'username');
    res.send(projects);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('creator', 'username');
    res.send(project);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
