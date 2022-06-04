const mongoose = require("mongoose");

const mahasiswaScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nim: {
    type: Number,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Mahasiswa", mahasiswaScheme);
