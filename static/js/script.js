document.addEventListener('DOMContentLoaded', function() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step1Dot = document.getElementById('step1-dot');
    const step2Dot = document.getElementById('step2-dot');
    const nextStepBtn = document.getElementById('next-step-btn');
    const sendFinalBtn = document.getElementById('send-final-btn');
    const backBtn = document.getElementById('back-btn');
    const phoneInput = document.getElementById('phone-input');
    const phoneDisplay = document.getElementById('phone-display');
    const resendCodeLink = document.getElementById('resend-code');
    const timerSpan = document.getElementById('timer');

    let isResendEnabled = false;
    let countdown = 6;

    // Función para cambiar a Paso 2
    nextStepBtn.addEventListener('click', function() {
        if (!validateStep1()) return;

        // Guardar número de teléfono para mostrarlo
        const phoneValue = phoneInput.value.trim();
        phoneDisplay.textContent = phoneValue ? `+51 ${phoneValue}` : '+51 999555666';

        // Cambiar a Paso 2
        step1.style.display = 'none';
        step2.style.display = 'block';
        step1Dot.classList.remove('active');
        step1Dot.classList.add('completed');
        step2Dot.classList.add('active');
        backBtn.style.display = 'block';

        // Iniciar temporizador de reenvío
        startCountdown();
    });

    // Función para volver al Paso 1
    backBtn.addEventListener('click', function() {
        step2.style.display = 'none';
        step1.style.display = 'block';
        step2Dot.classList.remove('active');
        step1Dot.classList.add('active');
        backBtn.style.display = 'none';
    });

    // Función para enviar el formulario final
    sendFinalBtn.addEventListener('click', function() {
        const codeInputs = document.querySelectorAll('.code-input');
        const code = Array.from(codeInputs).map(input => input.value).join('');

        if (code.length !== 4 || !/^\d{4}$/.test(code)) {
            alert('Por favor, ingresa un código de 4 dígitos válido.');
            return;
        }

        alert('¡Gracias por tu información! Nos contactaremos contigo pronto.');
        resetForm();
    });

    // Función para reenviar código
    resendCodeLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (isResendEnabled) {
            alert('Código reenviado.');
            countdown = 6;
            startCountdown();
        }
    });

    // Validación del Paso 1
    function validateStep1() {
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

    // Temporizador para reenviar código
    function startCountdown() {
        isResendEnabled = false;
        timerSpan.textContent = countdown;
        const interval = setInterval(() => {
            countdown--;
            timerSpan.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(interval);
                isResendEnabled = true;
                timerSpan.textContent = '0';
                resendCodeLink.style.color = '#FFC107';
            }
        }, 1000);
    }

    // Auto-enfoque y navegación entre inputs de código
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // WhatsApp Button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open('https://wa.me/51999999999', '_blank');
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

// Función para reiniciar el formulario
function resetForm() {
    document.getElementById('step1-form').reset();
    document.querySelectorAll('.code-input').forEach(input => input.value = '');
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step1-dot').classList.add('active');
    document.getElementById('step1-dot').classList.remove('completed');
    document.getElementById('step2-dot').classList.remove('active');
    document.getElementById('back-btn').style.display = 'none';
}