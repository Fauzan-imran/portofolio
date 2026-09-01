// 1. import library yang di butuhkan
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 2. load konfigurasi dari file .env
dotenv.config();

// 3. Inisalisasi aplikasi express
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Endpoint dasar
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Selamat datang di API saya",
    version: "1.0.0",
  });
});

// Endpoint untuk cek status API
app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server dalam keadaan sehat dan aktif.",
    timestamp: new Date().toISOString()
  });
});

app.get('/api/biodata',(req,res)=>{
    res.status(200).json({
        success: true,
        data: {
            nama: "Muhammad Fauzan Mubarok Imran",
            kelas: "XI RPL 1",
            cita_cita: "full stack developer",
            hobi: ", bermain game, dan coding",
        }
    });
});

// 6. MIddleware untuk menangani router yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// 7. Menjalankan server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`=================================`);
});