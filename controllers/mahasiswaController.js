// Membuat variabel Mahasiswa dan mengimport/required dari model Mahasiswa
const Mahasiswa = require("../models/Mahasiswa");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk mahasiswa
  viewMahasiswa: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const mahasiswa = await Mahasiswa.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        mahasiswa,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/mahasiswa");
    }
  },

  // Membuat create data untuk mahasiswa
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addMahasiswa: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { nama, nim, jurusan, alamat } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
      await Mahasiswa.create({ nama, nim, jurusan, alamat });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Mahasiswa");
      req.flash("alertStatus", "success");
      res.redirect("/mahasiswa"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/mahasiswa");
    }
  },

  // Membuat read data untuk mahasiswa
  // types code in here..

  // Membuat update data untuk mahasiswa
  editMahasiswa: async (req, res) => {
    try {
      const { id, nama, nim, jurusan, alamat } = req.body;

      const mahasiswa = await Mahasiswa.findOne({ _id: id });

      mahasiswa.nama = nama;
      mahasiswa.nim = nim;
      mahasiswa.jurusan = jurusan;
      mahasiswa.alamat = alamat;

      await mahasiswa.save();

      req.flash("alertMessage", "Success edit data mahasiswa");
      req.flash("alertStatus", "success");
      res.redirect("/mahasiswa");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/mahasiswa");
    }
  },

  // Membuat delete data untuk mahasiswa
  deleteMahasiswa: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const mahasiswa = await Mahasiswa.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await mahasiswa.remove();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data mahasiswa");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/mahasiswa");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/mahasiswa");
    }
  },
};
