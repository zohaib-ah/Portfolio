
document.addEventListener("DOMContentLoaded", function() {
    const skillElements = document.querySelectorAll('.grid-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    skillElements.forEach(element => {
        observer.observe(element);
    });
});
