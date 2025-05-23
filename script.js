document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Tokenomics Chart
    const ctx = document.getElementById('tokenomicsChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Liquidity Pool', 'Marketing', 'Development', 'Team', 'Community Rewards'],
                datasets: [{
                    data: [50, 15, 15, 10, 10],
                    backgroundColor: [
                        '#ffd700', // Gold
                        '#ff5722', // Orange-red
                        '#4caf50', // Green
                        '#9c27b0', // Purple
                        '#2196f3'  // Blue
                    ],
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
    
    // Countdown Timer
    function updateCountdown() {
        const launchDate = new Date('June 20, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h3>AlienPing Has Launched! 🚀</h3>';
        }
    }
    
    // Update the countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .token-info-card, .roadmap-item, .faq-item, .social-link');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .token-info-card, .roadmap-item, .faq-item, .social-link {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .token-info-card.animate, .roadmap-item.animate, .faq-item.animate, .social-link.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2), .token-info-card:nth-child(2), .roadmap-item:nth-child(2), .social-link:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .feature-card:nth-child(3), .token-info-card:nth-child(3), .roadmap-item:nth-child(3), .social-link:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(4), .token-info-card:nth-child(4), .roadmap-item:nth-child(4), .social-link:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .feature-card:nth-child(5), .token-info-card:nth-child(5), .social-link:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .feature-card:nth-child(6), .token-info-card:nth-child(6), .social-link:nth-child(6) {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would normally send this to your backend
            // For now, just show an alert
            alert(`Thank you! ${email} has been added to our launch notification list.`);
            this.reset();
        });
    }
});