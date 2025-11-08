document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Auto-avance cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);

    // Clic en los puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // WhatsApp
    const waBtn = document.querySelector('.btn-whatsapp');
    if (waBtn) {
        waBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://wa.me/51962182392?text=Hola,%20vengo%20de%20la%20página%20web%20me%20interesa%20más%20información.', '_blank');
        });
    }

    // Formulario
    const form = document.getElementById('infoForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias! Nos pondremos en contacto contigo.');
            form.reset();
        });
    }
});