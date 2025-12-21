// admin-script.js

// Check Authentication
function checkAuth() {
    const session = sessionStorage.getItem('adminSession');
    if (!session) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// Initialize
window.addEventListener('load', () => {
    if (!checkAuth()) return;
    
    loadData();
    updateStats();
});

// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    }
});

// Toggle Sidebar
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleBtn = document.getElementById('toggleSidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
});

// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId + 'Tab').classList.add('active');
    });
});

// Data Storage
let packages = [
    { id: 1, name: 'Paket Reguler', price: 50000, capacity: '1 orang', desc: 'Paket untuk kunjungan individual' },
    { id: 2, name: 'Paket Keluarga', price: 150000, capacity: '4 orang', desc: 'Paket hemat untuk keluarga' },
    { id: 3, name: 'Paket VIP', price: 300000, capacity: '6 orang', desc: 'Pengalaman wisata eksklusif' }
];

let bookings = [];
let gallery = [
    { id: 1, title: 'Pemandangan Utama', url: 'https://i.imgur.com/KCZRqZP.jpeg' },
    { id: 2, title: 'Area Wisata', url: 'https://i.imgur.com/FtKnzrg.jpeg' },
    { id: 3, title: 'Spot Foto Indah', url: 'https://i.imgur.com/TMKoxeI.jpeg' },
    { id: 4, title: 'Pemandangan Hijau', url: 'https://i.imgur.com/gt2M42H.jpeg' },
    { id: 5, title: 'Fasilitas Wisata', url: 'https://i.imgur.com/dp2KfNJ.jpeg' },
    { id: 6, title: 'Panorama', url: 'https://i.imgur.com/32p6Bec.jpeg' }
];

// Load Data
function loadData() {
    renderPackages();
    renderBookings();
    renderGallery();
}

// Update Stats
function updateStats() {
    document.getElementById('totalPackages').textContent = packages.length;
    document.getElementById('totalBookings').textContent = bookings.length;
    document.getElementById('pendingBookings').textContent = bookings.filter(b => b.status === 'pending').length;
    document.getElementById('totalGallery').textContent = gallery.length;
}

// ===== PACKAGES CRUD =====
let editingPackageId = null;

function renderPackages() {
    const tbody = document.getElementById('packagesBody');
    tbody.innerHTML = '';
    
    packages.forEach((pkg, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${pkg.name}</td>
            <td>Rp ${pkg.price.toLocaleString('id-ID')}</td>
            <td>${pkg.capacity}</td>
            <td>
                <button class="btn-action btn-edit" onclick="editPackage(${pkg.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-action btn-delete" onclick="deletePackage(${pkg.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('btnAddPackage').addEventListener('click', () => {
    editingPackageId = null;
    document.getElementById('modalPackageTitle').textContent = 'Tambah Paket Wisata';
    document.getElementById('formPackage').reset();
    document.getElementById('modalPackage').classList.add('active');
});

document.getElementById('formPackage').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('packageName').value,
        price: parseInt(document.getElementById('packagePrice').value),
        capacity: document.getElementById('packageCapacity').value,
        desc: document.getElementById('packageDesc').value
    };
    
    if (editingPackageId) {
        const index = packages.findIndex(p => p.id === editingPackageId);
        packages[index] = { ...packages[index], ...data };
        alert('Paket berhasil diupdate!');
    } else {
        const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
        packages.push({ id: newId, ...data });
        alert('Paket berhasil ditambahkan!');
    }
    
    renderPackages();
    updateStats();
    closeModal('modalPackage');
});

function editPackage(id) {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;
    
    editingPackageId = id;
    document.getElementById('modalPackageTitle').textContent = 'Edit Paket Wisata';
    document.getElementById('packageName').value = pkg.name;
    document.getElementById('packagePrice').value = pkg.price;
    document.getElementById('packageCapacity').value = pkg.capacity;
    document.getElementById('packageDesc').value = pkg.desc;
    document.getElementById('modalPackage').classList.add('active');
}

function deletePackage(id) {
    if (confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
        packages = packages.filter(p => p.id !== id);
        renderPackages();
        updateStats();
        alert('Paket berhasil dihapus!');
    }
}

// ===== BOOKINGS =====
function renderBookings() {
    const tbody = document.getElementById('bookingsBody');
    tbody.innerHTML = '';
    
    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">Belum ada pemesanan</td></tr>';
        return;
    }
    
    bookings.forEach((booking, index) => {
        const tr = document.createElement('tr');
        const statusClass = booking.status === 'confirmed' ? 'badge-confirmed' : 
                           booking.status === 'cancelled' ? 'badge-cancelled' : 'badge-pending';
        const statusText = booking.status === 'confirmed' ? 'Dikonfirmasi' : 
                          booking.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu';
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${booking.name}</td>
            <td>${booking.package}</td>
            <td>${booking.date}</td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn-action btn-view" onclick="viewBooking(${booking.id})">
                    <i class="fas fa-eye"></i> Detail
                </button>
                ${booking.status === 'pending' ? `
                    <button class="btn-action btn-edit" onclick="confirmBooking(${booking.id})">
                        <i class="fas fa-check"></i> Konfirmasi
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;
    
    alert(`Detail Pemesanan:\n\nNama: ${booking.name}\nPaket: ${booking.package}\nTanggal: ${booking.date}\nJumlah: ${booking.people} orang\nEmail: ${booking.email}\nTelepon: ${booking.phone}\nStatus: ${booking.status}`);
}

function confirmBooking(id) {
    if (confirm('Konfirmasi pemesanan ini?')) {
        const index = bookings.findIndex(b => b.id === id);
        bookings[index].status = 'confirmed';
        renderBookings();
        updateStats();
        alert('Pemesanan berhasil dikonfirmasi!');
    }
}

// ===== GALLERY CRUD =====
let editingGalleryId = null;

function renderGallery() {
    const tbody = document.getElementById('galleryBody');
    tbody.innerHTML = '';
    
    gallery.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td><a href="${item.url}" target="_blank" style="color: #3498db;">${item.url.substring(0, 50)}...</a></td>
            <td>
                <button class="btn-action btn-edit" onclick="editGallery(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-action btn-delete" onclick="deleteGallery(${item.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('btnAddGallery').addEventListener('click', () => {
    editingGalleryId = null;
    document.getElementById('modalGalleryTitle').textContent = 'Tambah Foto Galeri';
    document.getElementById('formGallery').reset();
    document.getElementById('modalGallery').classList.add('active');
});

document.getElementById('formGallery').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('galleryTitle').value,
        url: document.getElementById('galleryUrl').value
    };
    
    if (editingGalleryId) {
        const index = gallery.findIndex(g => g.id === editingGalleryId);
        gallery[index] = { ...gallery[index], ...data };
        alert('Foto berhasil diupdate!');
    } else {
        const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
        gallery.push({ id: newId, ...data });
        alert('Foto berhasil ditambahkan!');
    }
    
    renderGallery();
    updateStats();
    closeModal('modalGallery');
});

function editGallery(id) {
    const item = gallery.find(g => g.id === id);
    if (!item) return;
    
    editingGalleryId = id;
    document.getElementById('modalGalleryTitle').textContent = 'Edit Foto Galeri';
    document.getElementById('galleryTitle').value = item.title;
    document.getElementById('galleryUrl').value = item.url;
    document.getElementById('modalGallery').classList.add('active');
}

function deleteGallery(id) {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
        gallery = gallery.filter(g => g.id !== id);
        renderGallery();
        updateStats();
        alert('Foto berhasil dihapus!');
    }
}

// ===== MODAL FUNCTIONS =====
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal on background click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ===== SEARCH FUNCTIONS =====
document.getElementById('searchPackages').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#packagesBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
});

document.getElementById('searchBookings').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#bookingsBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
});

document.getElementById('searchGallery').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#galleryBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
});