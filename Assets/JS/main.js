
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.grid-item, .project-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    VanillaTilt.init(document.querySelectorAll(".project-item"), {
        max: 5,
        speed: 400,
        perspective: 500,
    });
});
