<?php

// Prosedur / fungsi untuk menghitung diskon
function hitungDiskon($totalBelanja) {
    $diskon = 0;

    if ($totalBelanja >= 100000) {
        $diskon = 0.10 * $totalBelanja; // Diskon 10%
    } elseif ($totalBelanja >= 50000) {
        $diskon = 0.05 * $totalBelanja; // Diskon 5%
    }

    return $diskon; // Mengembalikan nilai diskon
}

// Contoh total belanja
$totalBelanja = 120000;

// Memanggil prosedur
$diskon = hitungDiskon($totalBelanja);

// Menghitung total pembayaran
$totalBayar = $totalBelanja - $diskon;

// Menampilkan hasil
echo "Total Belanja : Rp. " . $totalBelanja . "<br>";
echo "Diskon        : Rp. " . $diskon . "<br>";
echo "Total Bayar   : Rp. " . $totalBayar . "<br>";

?>
