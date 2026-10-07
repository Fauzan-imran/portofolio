const db = require('../config/db');

// Ini Tampilkan semua data
const getAllExperiences = async () => {
  const [rows] = await db.query('SELECT * FROM experiences ORDER BY start_date DESC');
  return rows;
};

// Ini tampilkan semua data berdasarkan id
const getExperienceById = async (id) => {
  const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [id]);
  return rows[0];
};

// membuat data experiences baru
const createExperience = async (data) => {
  const { title, company, start_date, end_date, description } = data;
  const [result] = await db.query(
    'INSERT INTO experiences (title, company, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)',
    [title, company, start_date, end_date, description]
  );
  return { id: result.insertId, ...data };
};

// mengedit data experiences
const updateExperience = async (id, data) => {
  const { title, company, start_date, end_date, description } = data;
  await db.query(
    'UPDATE experiences SET title = ?, company = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?',
    [title, company, start_date, end_date, description, id]
  );
  return { id, ...data };
};

// menghapus data experiences
const deleteExperience = async (id) => {
  await db.query('DELETE FROM experiences WHERE id = ?', [id]);
};

module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };