document.addEventListener("DOMContentLoaded", function() {
    const options = {
        root: null, // Use the viewport as the container
        threshold: 0.5 // The callback will be triggered when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const section = entry.target;
            const headerWrapper = section.querySelector('.header-wrapper');
            
            if (entry.isIntersecting) {
                headerWrapper.classList.add('scaled');
            } else {
                headerWrapper.classList.remove('scaled');
            }
        });
    }, options);

    // Target each section with the data-section attribute
    document.querySelectorAll("section[data-section]").forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide-up');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Intersection Observer for scroll-based slide-up effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1
    });

    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Click event for navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll to the target element
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Apply the slide-up effect to the target element
                // Ensure to trigger a reflow to reapply the effect
                targetElement.classList.remove('show');
                void targetElement.offsetWidth; // Trigger reflow
                targetElement.classList.add('show');
            }
        });
    });
});