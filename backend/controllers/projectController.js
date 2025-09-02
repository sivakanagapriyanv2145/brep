const Project = require('../models/Project');
const { streamUpload, deleteFromCloudinary } = require('../utils/cloudinaryUploader');

// Create a new project
const createProject = async (req, res) => {
  try {
    const { projectName, category, description, sqft, location, descriptionPhotosMeta } = req.body;

    if (!req.files || !req.files.mainPhoto) {
      return res.status(400).json({ message: 'Main photo is required.' });
    }

    // Upload main photo
    const mainPhotoUpload = await streamUpload(req.files.mainPhoto[0].buffer);

    // Upload description photos
    const descriptionPhotos = [];
    const meta = descriptionPhotosMeta ? JSON.parse(descriptionPhotosMeta) : { captions: [] };
    
    if (req.files.descriptionPhotos) {
      for (let i = 0; i < req.files.descriptionPhotos.length; i++) {
        const file = req.files.descriptionPhotos[i];
        const uploadResult = await streamUpload(file.buffer);
        descriptionPhotos.push({
          url: uploadResult.secure_url,
          caption: meta.captions[i] || '',
        });
      }
    }

    const newProject = new Project({
      projectName,
      category,
      description,
      sqft,
      location,
      mainPhoto: mainPhotoUpload.secure_url,
      descriptionPhotos,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Create Project Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, category, description, sqft, location, updates } = req.body;
    
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const updateData = { projectName, category, description, sqft, location };
    
    // Update main photo if a new one is uploaded
    if (req.files?.mainPhoto) {
      await deleteFromCloudinary(project.mainPhoto);
      const mainPhotoUpload = await streamUpload(req.files.mainPhoto[0].buffer);
      updateData.mainPhoto = mainPhotoUpload.secure_url;
    }
    
    let finalDescriptionPhotos = [];
    if (updates) {
      const parsedUpdates = JSON.parse(updates);
      
      // Delete removed photos from Cloudinary
      if (parsedUpdates.removed && parsedUpdates.removed.length > 0) {
        await Promise.all(parsedUpdates.removed.map(url => deleteFromCloudinary(url)));
      }
      
      // The new order of existing photos
      finalDescriptionPhotos = parsedUpdates.existing || [];
      
      // Upload new description photos and add them
      if (req.files?.descriptionPhotos) {
        for (let i = 0; i < req.files.descriptionPhotos.length; i++) {
          const file = req.files.descriptionPhotos[i];
          const uploadResult = await streamUpload(file.buffer);
          finalDescriptionPhotos.push({
            url: uploadResult.secure_url,
            caption: parsedUpdates.newCaptions[i] || '',
          });
        }
      }
      updateData.descriptionPhotos = finalDescriptionPhotos;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedProject);
  } catch (err) {
    console.error('Update Project Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete associated images from Cloudinary
    await deleteFromCloudinary(project.mainPhoto);
    if (project.descriptionPhotos && project.descriptionPhotos.length > 0) {
        await Promise.all(project.descriptionPhotos.map(photo => deleteFromCloudinary(photo.url)));
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
