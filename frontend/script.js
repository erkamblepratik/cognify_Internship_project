/* ============================================
   LEVEL 3 · COGNIFYZ IMAGE & LANDING PAGE
   Complete JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Level 3 · Cognifyz Image & Landing JS loaded successfully!');

    // ==========================================
    // TASK 3.1: IMAGE GALLERY - Lightbox
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxIcon = document.querySelector('.lightbox-icon i');

    // Gallery data
    const galleryData = {
        'AI Technology': {
            icon: 'fa-robot',
            description: 'Artificial Intelligence solutions for modern businesses'
        },
        'Machine Learning': {
            icon: 'fa-brain',
            description: 'Advanced machine learning models and predictions'
        },
        'Data Analytics': {
            icon: 'fa-chart-line',
            description: 'Transform raw data into actionable intelligence'
        },
        'Web Development': {
            icon: 'fa-code',
            description: 'Building responsive and modern web applications'
        },
        'Cloud Computing': {
            icon: 'fa-cloud',
            description: 'Scalable and secure cloud infrastructure solutions'
        },
        'Cybersecurity': {
            icon: 'fa-shield-alt',
            description: 'Protecting data and systems from cyber threats'
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.dataset.title;
            const data = galleryData[title];
            
            if (data) {
                // Update lightbox content
                lightboxIcon.className = `fas ${data.icon}`;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = data.description;
                
                // Show lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightbox && lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on click outside
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ==========================================
    // TASK 3.2: IMAGE SLIDESHOW
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slideshow-indicators .indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (!slides.length || !indicators.length) return;

        // Remove active from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active to current
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        if (!slides.length) return;
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        if (!slides.length) return;
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });

    // Click on indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.dataset.slide);
            goToSlide(slideIndex);
            resetInterval();
        });
    });

    // Auto-slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Start auto-slide when the page includes a slideshow.
    if (slides.length) {
        startInterval();
    }

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer && slides.length) {
        slideshowContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        slideshowContainer.addEventListener('mouseleave', function() {
            startInterval();
        });
    }

    // ==========================================
    // TASK 3.3: LANDING PAGE - CTA Buttons
    // ==========================================
    function handleApplyNow() {
        alert(
            '🚀 Thank you for your interest in the Web Developer Internship!\n\n' +
            '📋 Application Process:\n' +
            '1. Submit your resume and portfolio\n' +
            '2. Complete a technical assessment\n' +
            '3. Interview with the team\n\n' +
            '📧 Send your application to: contact@cognifyz.com\n' +
            '📌 Use subject: "Web Developer Internship Application"\n\n' +
            'We look forward to reviewing your application!'
        );
    }

    function handleLearnMore() {
        alert(
            '📚 Web Developer Internship at Cognifyz Technologies\n\n' +
            '✨ Program Highlights:\n' +
            '• 3-month paid internship\n' +
            '• Real-world projects\n' +
            '• 1-on-1 mentorship\n' +
            '• Certificate of completion\n\n' +
            '🔧 Technologies you\'ll work with:\n' +
            '• HTML, CSS, JavaScript\n' +
            '• React / Angular\n' +
            '• Node.js, Express\n' +
            '• Cloud platforms (AWS/Azure)\n\n' +
            '🌐 Visit: www.cognifyz.com/careers'
        );
    }

    // Apply Now buttons
    const applyBtns = document.querySelectorAll('#applyNowBtn, #applyNowBtn2, #applyNowNav');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', handleApplyNow);
    });

    // Learn More button
    const learnBtn = document.getElementById('learnMoreBtn');
    if (learnBtn) {
        learnBtn.addEventListener('click', handleLearnMore);
    }

    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    if (contactForm && contactSuccess) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            contactSuccess.textContent = 'Thanks! Your message has been received.';
            contactForm.reset();
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // KEYBOARD NAVIGATION FOR SLIDESHOW
    // ==========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // ==========================================
    // LOG ALL TASKS
    // ==========================================
    console.log('📌 Level 3 Tasks Ready:');
    console.log('   ✅ 3.1: Image Gallery (click thumbnails)');
    console.log('   ✅ 3.2: Image Slideshow (auto-transitions)');
    console.log('   ✅ 3.3: Landing Page (Apply Now / Learn More)');
});