document.addEventListener('DOMContentLoaded', () => {
    // --- Data Configuration ---
    const roles = ["Web Developer", "Mobile App Designer", "Full Stack Engineer", "UI/UX Expert"];

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            category: "Web",
            description: "A full-featured online store with payment integration, user accounts, and admin dashboard.",
            tech: ["PHP", "Laravel", "MySQL", "Bootstrap"],
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 2,
            title: "Fitness Tracking App",
            category: "Mobile",
            description: "Cross-platform mobile application for tracking workouts, nutrition, and personal goals.",
            tech: ["Flutter", "Firebase", "Dart"],
            image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 3,
            title: "Crypto Dashboard",
            category: "UI/UX",
            description: "Minimalist and intuitive dashboard for monitoring cryptocurrency real-time prices and trends.",
            tech: ["Figma", "Adobe XD", "UI Design"],
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 4,
            title: "Social Media API",
            category: "Web",
            description: "Scalable RESTful API for a social networking platform with complex relationship handling.",
            tech: ["Node.js", "Express", "MongoDB"],
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
            liveLink: "#",
            githubLink: "#"
        }
    ];

    const experience = [
        {
            type: "work",
            title: "Senior Full Stack Developer",
            organization: "Tech Innovators Inc.",
            period: "2021 - Present",
            description: "Leading the development of enterprise-level SaaS applications used by thousands of users worldwide."
        },
        {
            type: "work",
            title: "Web Developer",
            organization: "Creative Solutions Agency",
            period: "2018 - 2021",
            description: "Developed custom websites and e-commerce platforms for diverse clients across various industries."
        },
        {
            type: "edu",
            title: "Master in Computer Science",
            organization: "Global University",
            period: "2016 - 2018",
            description: "Specialized in Software Engineering and Distributed Systems."
        }
    ];

    const testimonials = [
        {
            name: "John Doe",
            role: "CEO at StartupX",
            content: "Samiir is an exceptional developer who delivered our project ahead of schedule and exceeded our expectations in every way.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Sarah Smith",
            role: "Product Manager",
            content: "The level of detail and care Samiir puts into UI/UX is unmatched. Our app's user engagement increased by 40% after the redesign.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        }
    ];

    // --- Components & Functions ---

    // Typing Effect
    const typingSpan = document.getElementById('typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 150;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

        filtered.forEach(project => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 project-item';
            col.innerHTML = `
                <div class="project-card shadow-sm" data-id="${project.id}">
                    <img src="${project.image}" alt="${project.title}" class="img-fluid w-100">
                    <div class="project-overlay">
                        <span class="badge bg-primary mb-2 align-self-start">${project.category}</span>
                        <h4 class="text-white fw-bold mb-1">${project.title}</h4>
                        <p class="text-white-50 small mb-0">Learn More <i class="bi bi-arrow-right"></i></p>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(col);

            // Add Click Event for Modal
            col.querySelector('.project-card').addEventListener('click', () => showProjectDetails(project.id));
        });
    }

    // Show Project Modal
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalContent = document.getElementById('modal-content');

    function showProjectDetails(id) {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        modalContent.innerHTML = `
            <img src="${project.image}" class="img-fluid rounded-4 mb-4 shadow" alt="${project.title}">
            <h3 class="fw-bold mb-3">${project.title}</h3>
            <div class="mb-4">
                ${project.tech.map(t => `<span class="badge bg-dark-soft text-primary border border-primary me-2 mb-2 p-2">${t}</span>`).join('')}
            </div>
            <p class="text-secondary mb-4 fs-5">${project.description}</p>
            <div class="d-flex gap-3">
                <a href="${project.liveLink}" class="btn btn-primary px-4 rounded-pill">View Demo</a>
                <a href="${project.githubLink}" class="btn btn-outline-light px-4 rounded-pill"><i class="bi bi-github me-2"></i>GitHub</a>
            </div>
        `;
        projectModal.show();
    }

    // Render Timeline
    const timelineContainer = document.getElementById('timeline-container');
    function renderTimeline() {
        experience.forEach(item => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="badge bg-primary mb-3">${item.period}</span>
                    <h5 class="fw-bold mb-1">${item.title}</h5>
                    <h6 class="text-primary mb-3">${item.organization}</h6>
                    <p class="text-secondary mb-0 small">${item.description}</p>
                </div>
            `;
            timelineContainer.appendChild(div);
        });
    }

    // Render Testimonials
    const testimonialContainer = document.getElementById('testimonial-container');
    const indicatorContainer = document.querySelector('.carousel-indicators');

    function renderTestimonials() {
        testimonials.forEach((t, i) => {
            // Slide
            const slide = document.createElement('div');
            slide.className = `carousel-item ${i === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <div class="testimonial-card text-center border-0">
                    <div class="avatar-box mb-4">
                        <img src="${t.avatar}" alt="${t.name}" class="rounded-circle shadow" width="80" height="80">
                    </div>
                    <p class="lead text-secondary font-italic mb-4">"${t.content}"</p>
                    <h5 class="fw-bold text-white mb-0">${t.name}</h5>
                    <p class="text-primary small">${t.role}</p>
                </div>
            `;
            testimonialContainer.appendChild(slide);

            // Indicator
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.dataset.bsTarget = '#testimonial-carousel';
            btn.dataset.bsSlideTo = i;
            if (i === 0) {
                btn.className = 'active';
                btn.ariaCurrent = 'true';
            }
            indicatorContainer.appendChild(btn);
        });
    }

    // Intersection Observer for Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Counter Animation
                    if (entry.target.classList.contains('counter')) {
                        const target = +entry.target.dataset.target;
                        let current = 0;
                        const increment = target / 50;
                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                entry.target.innerText = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                entry.target.innerText = target;
                            }
                        };
                        updateCounter();
                        observer.unobserve(entry.target);
                    }

                    // Progress Bar Animation
                    if (entry.target.classList.contains('progress-bar')) {
                        entry.target.style.width = entry.target.dataset.width;
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.counter, .progress-bar').forEach(el => observer.observe(el));
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        const backToTop = document.getElementById('back-to-top');

        if (window.scrollY > 50) {
            nav.classList.add('navbar-scrolled', 'scrolled');
        } else {
            nav.classList.remove('navbar-scrolled', 'scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (contactForm.checkValidity()) {
            formFeedback.innerHTML = `<div class="alert alert-success mt-3 rounded-pill text-center">Your message has been sent successfully!</div>`;
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        } else {
            formFeedback.innerHTML = `<div class="alert alert-danger mt-3 rounded-pill text-center">Please fill out all fields correctly.</div>`;
            contactForm.classList.add('was-validated');
        }
    });

    // Filter Logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    // Back to top click
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Close offcanvas on link click (mobile)
    const sidebarMenu = document.getElementById('sidebarMenu');
    const bsOffcanvas = new bootstrap.Offcanvas(sidebarMenu);
    document.querySelectorAll('#navbar-main .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsOffcanvas.hide();
            }
        });
    });

    // Initialize
    type();
    renderProjects();
    renderTimeline();
    renderTestimonials();
    initScrollAnimations();
});
