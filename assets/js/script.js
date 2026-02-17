function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Device detection to block phones
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth < 768;
}

function isTabletOrIPad() {
    return /iPad|Android|Tablet/i.test(navigator.userAgent) || (window.innerWidth >= 768 && window.innerWidth < 1024);
}

window.onload = function() {
    if (isMobile() && !isTabletOrIPad()) {
        document.getElementById('mobile-message').style.display = 'block';
    }
};

// Add any additional JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any interactive elements
    console.log('PPID website loaded');

    // Toggle chevron icons and dropdown menus on click
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        const chevron = dropdown.querySelector('i');

        if (link && menu && chevron) {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.display = 'none';
                        const otherChevron = otherMenu.parentElement.querySelector('i');
                        if (otherChevron) {
                            otherChevron.classList.remove('fa-chevron-up');
                            otherChevron.classList.add('fa-chevron-down');
                        }
                    }
                });

                // Toggle current dropdown
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                } else {
                    menu.style.display = 'block';
                    chevron.classList.remove('fa-chevron-down');
                    chevron.classList.add('fa-chevron-up');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                const chevron = menu.parentElement.querySelector('i');
                if (chevron) {
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                }
            });
        }
    });

    // ===== MODAL FUNCTIONALITY =====
    
    // Eye icon click handler (for informasi tables)
    const eyeIcons = document.querySelectorAll('.aksi i.bi-eye');
    eyeIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('detailModal');
            if (modal) {
                // Get data from data attributes
                const title = this.getAttribute('data-title') || 'Informasi Publik';
                const description = this.getAttribute('data-description') || '';
                const category = this.getAttribute('data-category') || 'Kategori';
                const date = this.getAttribute('data-date') || '';
                const size = this.getAttribute('data-size') || '';
                const downloads = this.getAttribute('data-downloads') || '0';
                
                // Populate modal
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalCategory').textContent = category;
                document.getElementById('modalCategory').className = 'badge bg-primary me-2';
                document.getElementById('modalDate').textContent = date;
                document.getElementById('modalSize').textContent = size;
                document.getElementById('modalDownloads').textContent = downloads + ' unduhan';
                document.getElementById('modalDescription').textContent = description;
                
                // Show download button for document modal
                const downloadBtn = document.getElementById('modalDownloadBtn');
                if (downloadBtn) {
                    downloadBtn.style.display = 'inline-flex';
                }
                
                // Show modal
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            }
        });
    });

    // Selangkasya link click handler (for announcements)
    const selangkasyaLinks = document.querySelectorAll('.selangkasya-link');
    selangkasyaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('detailModal');
            if (modal) {
                // Get data from data attributes
                const title = this.getAttribute('data-title') || 'Pengumuman';
                const fullContent = this.getAttribute('data-full-content') || '';
                const category = this.getAttribute('data-category') || 'Kategori';
                const date = this.getAttribute('data-date') || '';
                const views = this.getAttribute('data-views') || '0';
                
                // Populate modal
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalCategory').textContent = category;
                document.getElementById('modalCategory').className = 'badge bg-warning text-dark me-2';
                document.getElementById('modalDate').textContent = date;
                document.getElementById('modalSize').textContent = views + ' dilihat';
                document.getElementById('modalDownloads').textContent = '';
                document.getElementById('modalDescription').textContent = fullContent;
                
                // Hide download button for announcement modal
                const downloadBtn = document.getElementById('modalDownloadBtn');
                if (downloadBtn) {
                    downloadBtn.style.display = 'none';
                }
                
                // Show modal
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            }
        });
    });

    // Lihat link click handler (for lihat semua/lihat dokumen links)
    const lihatLinks = document.querySelectorAll('.lihat-link');
    lihatLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('detailModal');
            if (modal) {
                // Get data from data attributes
                const title = this.getAttribute('data-title') || 'Informasi';
                const description = this.getAttribute('data-description') || '';
                const category = this.getAttribute('data-category') || 'Kategori';
                const date = this.getAttribute('data-date') || '';
                
                // Populate modal
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalCategory').textContent = category;
                document.getElementById('modalCategory').className = 'badge bg-info text-dark me-2';
                document.getElementById('modalDate').textContent = date;
                document.getElementById('modalSize').textContent = '';
                document.getElementById('modalDownloads').textContent = '';
                document.getElementById('modalDescription').textContent = description;
                
                // Hide download button
                const downloadBtn = document.getElementById('modalDownloadBtn');
                if (downloadBtn) {
                    downloadBtn.style.display = 'none';
                }
                
                // Show modal
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            }
        });
    });

    // Fallback: Handle Selengkapnya links without selangkasya-link class
    // This catches clicks on any link with class "text-warning fw-semibold"
    document.querySelectorAll('a.text-warning.fw-semibold').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('detailModal');
            if (!modal) return;
            
            // Extract data from parent elements
            const cardCol = this.closest('.col');
            if (!cardCol) return;
            
            const titleEl = cardCol.querySelector('h5.card-title');
            const title = titleEl ? titleEl.textContent.trim() : 'Pengumuman';
            
            const badgeEl = cardCol.querySelector('.badge');
            const category = badgeEl ? badgeEl.textContent.trim() : 'Kategori';
            
            const descEl = cardCol.querySelector('p.card-text');
            const fullContent = descEl ? descEl.textContent.trim() : '';
            
            const viewsEl = cardCol.querySelector('.text-muted i.bi-eye');
            let views = '0';
            if (viewsEl && viewsEl.parentElement) {
                const viewsText = viewsEl.parentElement.textContent.trim();
                views = viewsText.replace(/[^0-9]/g, '');
            }
            
            // Get date from sibling date box
            let date = '';
            const row = cardCol.parentElement;
            if (row) {
                const dateBox = row.querySelector('.bg-primary');
                if (dateBox) {
                    const dayEl = dateBox.querySelector('.fs-4');
                    const monthEl = dateBox.querySelector('.small.fw-bold');
                    const yearEl = dateBox.querySelector('.small:not(.fw-bold)');
                    if (dayEl && monthEl && yearEl) {
                        date = monthEl.textContent + ' ' + dayEl.textContent + ' ' + yearEl.textContent;
                    }
                }
            }
            
            // Populate modal
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalCategory').textContent = category;
            document.getElementById('modalCategory').className = 'badge bg-warning text-dark me-2';
            document.getElementById('modalDate').textContent = date;
            document.getElementById('modalSize').textContent = views + ' dilihat';
            document.getElementById('modalDownloads').textContent = '';
            document.getElementById('modalDescription').textContent = fullContent;
            
            // Hide download button
            const downloadBtn = document.getElementById('modalDownloadBtn');
            if (downloadBtn) {
                downloadBtn.style.display = 'none';
            }
            
            // Show modal
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
});
