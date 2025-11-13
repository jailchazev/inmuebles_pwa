document.addEventListener('DOMContentLoaded', function() {
    const sendInfoBtn = document.getElementById('send-info-btn');

    // Función para enviar el formulario
    sendInfoBtn.addEventListener('click', function() {
        if (!validateForm()) return;

        const formData = {
            nombre: document.querySelector('#step1-form input[placeholder="Nombre*"]').value,
            apellidos: document.querySelector('#step1-form input[placeholder="Apellidos*"]').value,
            documento: document.querySelector('#step1-form input[placeholder="Nro. de documento*"]').value,
            telefono: document.querySelector('#step1-form input[placeholder="Teléfono*"]').value,
            correo: document.querySelector('#step1-form input[placeholder="Correo electrónico*"]').value
        };

        fetch('/send-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                resetForm();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu información. Por favor, inténtalo más tarde.');
        });
    });

    // Validación del formulario
    function validateForm() {
        const form = document.getElementById('step1-form');
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        const checkboxes = form.querySelectorAll('input[type="checkbox"]:required');
        checkboxes.forEach(cb => {
            if (!cb.checked) {
                cb.style.border = '2px solid red';
                isValid = false;
            } else {
                cb.style.border = '';
            }
        });

        if (!isValid) {
            alert('Por favor, completa todos los campos obligatorios.');
        }

        return isValid;
    }

    // Función para reiniciar el formulario
    function resetForm() {
        document.getElementById('step1-form').reset();
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    }

    // WhatsApp Button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open('https://wa.me/51999999999?text=Hola!%20Vi%20sus%20lotes%20en%20la%20web%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n.', '_blank');
        });
    }

    // Gallery Tabs
    const tabs = document.querySelectorAll('.gallery-tabs button');
    const content = document.querySelector('.gallery-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            content.innerHTML = `<p>Mostrando: ${this.textContent}</p>`;
        });
    });

    // Slider Dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
});