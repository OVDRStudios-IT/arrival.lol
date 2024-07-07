// Example JavaScript for interactive behaviors

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });
});
