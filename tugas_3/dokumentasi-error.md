# Dokumentasi Deteksi Error

Berikut adalah daftar singkat error utama yang teridentifikasi dalam kode program dan script SQL.

| File | Deskripsi Error Singkat | Perbaikan Utama |
| :--- | :--- | :--- |
| *form-daftar.php* | Syntax HTML: Deklarasi DOCTYPE salah dan struktur tag input rusak. | Perbaiki DOCTYPE menjadi <!DOCTYPE html> dan rapikan tag HTML/input. |
| *proses-pendaftaran-2.php* | Syntax PHP: Variabel $nama ($=S$ _POST) dan $sekolah (tanpa $) salah. | Perbaiki menjadi $nama = $_POST['nama']; dan $sekolah = .... |
| *proses-pendaftaran-2.php* | SQL Syntax: Menggunakan VALUE bukan VALUES pada query INSERT. | Ganti VALUE menjadi VALUES. |
| *proses-pendaftaran-2.php* | *Security Risk (SQL Injection). | Terapkan **Prepared Statements* menggunakan mysqli_stmt_prepare. |
| *proses-pendaftaran-2.php* | Logic Error: Typo saat redirect (indek.ph). | Perbaiki menjadi header('Location: index.php?status=gagal');. |
| *calon_siswa.sql* | SQL Syntax: Menggunakan spasi pada nama tabel/kolom (calon siswa, jenis kelamin). | Ganti spasi dengan underscore (_), misalnya calon_siswa. |
| *calon_siswa.sql* | SQL Syntax: AUTO INCREMENT salah format. | Ubah menjadi AUTO_INCREMENT=.... |
