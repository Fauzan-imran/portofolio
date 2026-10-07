const experiencesModel = require('../models/experiencesModel');

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experiencesModel.getAllExperiences();
    res.status(200).json({ success: true, total: experiences.length, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await experiencesModel.getExperienceById(id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const createExperience = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.company || !data.start_date) {
      return res.status(400).json({ success: false, message: 'Title, company, and start date are required' });
    }
    const newExperience = await experiencesModel.createExperience(data);
    res.status(201).json({ success: true, data: newExperience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedExperience = await experiencesModel.updateExperience(id, data);
    if (!updatedExperience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: updatedExperience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExperience = await experiencesModel.deleteExperience(id);
    if (!deletedExperience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};