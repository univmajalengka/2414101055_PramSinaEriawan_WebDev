<!DOCTYPE html>
<html>
<head>
    <title>Status Pendaftaran</title>
</head>
<body>
    <header>
        <h1>Status Pendaftaran Siswa Baru</h1>
    </header>

    <?php if(isset($_GET['status'])): ?>
    <p>
        <?php
            if($_GET['status'] == 'sukses'){
                echo "Pendaftaran siswa baru berhasil!";
            } else {
                echo "Pendaftaran gagal! Silakan coba lagi.";
            }
        ?>
    </p>
    <?php endif; ?>

    <p>
        <a href="form-daftar.php">Kembali ke halaman pendaftaran</a>
    </p>

</body>
</html>