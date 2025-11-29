// Data Foto dari Imgur
const photos = [
    {
        url: 'https://i.imgur.com/KCZRqZP.jpeg',
        title: 'Pemandangan Utama Pangradinan'
    },
    {
        url: 'https://i.imgur.com/FtKnzrg.jpeg',
        title: 'Area Wisata'
    },
    {
        url: 'https://i.imgur.com/TMKoxeI.jpeg',
        title: 'Spot Foto Indah'
    },
    {
        url: 'https://i.imgur.com/gt2M42H.jpeg',
        title: 'Pemandangan Hijau'
    },
    {
        url: 'https://i.imgur.com/dp2KfNJ.jpeg',
        title: 'Fasilitas Wisata'
    },
    {
        url: 'https://i.imgur.com/32p6Bec.jpeg',
        title: 'Panorama Pangradinan'
    }
];

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animasi hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Load Gallery Photos
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Wisata+Pangradinan'">
            <div class="gallery-overlay">
                <h3>${photo.title}</h3>
            </div>
        `;
        
        // Add click event for modal (optional)
        galleryItem.addEventListener('click', () => {
            openImageModal(photo);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Image Modal
function openImageModal(photo) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="max-width: 90%; max-height: 90%; position: relative;">
            <img src="${photo.url}" style="max-width: 100%; max-height: 90vh; border-radius: 10px;" alt="${photo.title}">
            <h3 style="color: white; text-align: center; margin-top: 20px; font-size: 1.5rem;">${photo.title}</h3>
            <button style="position: absolute; top: -40px; right: 0; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; color: #333;">×</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
}

// Package Button Click Handler
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    
    const packageButtons = document.querySelectorAll('.btn-package');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.parentElement.querySelector('h3').textContent;
            const packagePrice = this.parentElement.querySelector('.price').textContent;
            
            alert(`Anda memilih ${packageName} dengan harga ${packagePrice}.\n\nUntuk pemesanan, silahkan hubungi kami melalui WhatsApp atau formulir kontak.`);
        });
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simulasi pengiriman form
        alert(`Terima kasih ${name}!\n\nPesan Anda telah diterima. Kami akan segera menghubungi Anda melalui email di ${email}.`);
        
        // Reset form
        contactForm.reset();
        
        // Dalam implementasi nyata, kirim data ke server
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: JSON.stringify({ name, email, message }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-item, .package-card, .info-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Back to Top Button (Optional)
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2ecc71;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#27ae60';
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#2ecc71';
        button.style.transform = 'translateY(0)';
    });
};

createBackToTop();

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});