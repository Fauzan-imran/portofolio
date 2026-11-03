const testimoniModel = require('../models/testimoniModel');

const getAllTestimoni = async (req, res) => {
    try {
        const testimoni = await testimoniModel.getAllTestimoni();
        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data testimoni.',
            total: testimoni.length,
            data: testimoni
        });
    } catch (error) {
        console.error('Error getAllTestimoni:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data testimoni.'
        });
    }
};

const getTestimoniById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimoni = await testimoniModel.getTestimoniById(id);
        if (!testimoni) {
            return res.status(404).json({
                success: false,
                message: `Testimoni dengan ID ${id} tidak ditemukan.`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data testimoni.',
            data: testimoni
        });
    } catch (error) {
        console.error('Error getTestimoniById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data testimoni.'
        });
    }
};

const createTestimoni = async (req, res) => {
    try {
        const testimoni = await testimoniModel.createTestimoni(req.body);
        res.status(201).json({
            success: true,
            message: 'Berhasil menambahkan data testimoni.',
            data: {id: testimoni.insertId}
        });
    } catch (error) {
        console.error('Error createTestimoni:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan data testimoni.'
        });
    }
};

const updateTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data.name || !data.role || !data.message) {
            return res.status(400).json({
                success: false,
                message: 'Semua field (name, role, message) harus diisi.'
            });
        }

        const testimoni = await testimoniModel.updateTestimoni(id, data);
        if (testimoni.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Testimoni dengan ID ${id} tidak ditemukan.`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Berhasil memperbarui data testimoni.',
            data: {id: id}
        });
    } catch (error) {
        console.error('Error updateTestimoni:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengupdate data testimoni.'
        });
    }
};

const deleteTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await testimoniModel.deleteTestimoni(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Testimoni dengan ID ${id} tidak ditemukan.`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Berhasil menghapus data testimoni.'
        });
    } catch (error) {
        console.error('Error deleteTestimoni:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus data testimoni.',
            error: error.message
        });
    }
};

module.exports = {
    getAllTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};