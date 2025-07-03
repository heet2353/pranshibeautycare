document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
    
    // Pause auto-rotation on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    });
    
    // Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const consent = document.getElementById('consent').checked;
        
        if (!name || !phone || !service || !date || !time || !consent) {
            alert('Please fill in all required fields and agree to the terms.');
            return;
        }
        
        // Phone number validation (simple check for Indian numbers)
        if (!/^[0-9]{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        
        // Here you would typically send the form data to your backend
        // For this example, we'll simulate a successful submission
        
        // Show success message
        appointmentForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after delay (in a real scenario, this would happen after server response)
        setTimeout(() => {
            appointmentForm.reset();
            appointmentForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 5000);
        
        /* 
        // In a real implementation, you would use something like:
        const formData = new FormData(appointmentForm);
        
        fetch('YOUR_GOOGLE_FORM_ACTION_URL', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            appointmentForm.style.display = 'none';
            formSuccess.style.display = 'block';
            appointmentForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
        });
        */
    });
    
    // Set minimum date for date picker to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Sticky CTA Button for Mobile
    const bookingCtaSection = document.querySelector('.booking-cta');
    const stickyCta = document.createElement('div');
    stickyCta.className = 'sticky-cta';
    stickyCta.innerHTML = `
        <a href="#booking" class="cta-btn">Book Now</a>
    `;
    document.body.appendChild(stickyCta);
    
    window.addEventListener('scroll', function() {
        const bookingCtaRect = bookingCtaSection.getBoundingClientRect();
        if (window.innerWidth <= 768 && bookingCtaRect.bottom < 0) {
            stickyCta.style.display = 'block';
        } else {
            stickyCta.style.display = 'none';
        }
    });
});

// Add sticky CTA styles dynamically
const stickyCtaStyles = document.createElement('style');
stickyCtaStyles.textContent = `
    .sticky-cta {
        position: fixed;
        bottom: 20px;
        left: 0;
        width: 100%;
        padding: 0 20px;
        display: none;
        z-index: 99;
        animation: slideUp 0.3s ease;
    }
    
    .sticky-cta a {
        display: block;
        width: 100%;
        text-align: center;
    }
    
    @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(stickyCtaStyles);
const scriptURL = 'https://script.google.com/macros/s/AKfycbxUVP1bslLOVcpPUZScMWOk8uHhZNWnYjj2Fnnvp68xdBwKTSvlgAS6R8Cx3dHRSmjE/exec'
            const form = document.forms['google-sheet']
          
            form.addEventListener('submit', e => {
              e.preventDefault()
              fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => alert("Thanks for Contacting us..! We Will Contact You Soon..."))
                .catch(error => console.error('Error!', error.message))
            })