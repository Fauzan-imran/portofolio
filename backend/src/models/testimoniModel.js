const db = require('../config/db');

const getAllTestimoni = async () => {
    const [rows] = await db.query('SELECT * FROM testimoni ORDER BY created_at DESC');
    return rows;
}
 
const getTestimoniById = async (id) => {
    const [rows] = await db.query('SELECT * FROM testimoni WHERE id = ?', [id]);
    return rows[0];
}

const createTestimoni = async (data) => {
    const { name, role, company, message } = data;
    const [result] = await db.query(
        'INSERT INTO testimoni (name, role, company, message) VALUES (?, ?, ?, ?)',
        [name, role, company, message]
    );
    return result;
};

const updateTestimoni = async (id, data) => {
    const { name, role, company, message } = data;
    const [result] = await db.query(
        'UPDATE testimoni SET name = ?, role = ?, company = ?, message = ? WHERE id = ?',
        [name, role, company, message, id]
    );
    return result;
};

const deleteTestimoni = async (id) => {
    const [result] = await db.query('DELETE FROM testimoni WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};