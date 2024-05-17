document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        // Particle JS konfiguration
    });

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Tilføj eventlistener for at ændre label-tekst ved klik på input-felter
    usernameInput.addEventListener('focus', function() {
        document.querySelector('label[for="username"]').textContent = 'Brugernavn:';
    });

    passwordInput.addEventListener('focus', function() {
        document.querySelector('label[for="password"]').textContent = 'Adgangskode:';
    });

    // Tilføj eventlistener for at ændre label-tekst ved tab fra input-felter
    usernameInput.addEventListener('blur', function() {
        if (usernameInput.value === '') {
            document.querySelector('label[for="username"]').textContent = 'Indtast dit brugernavn';
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (passwordInput.value === '') {
            document.querySelector('label[for="password"]').textContent = 'Indtast din adgangskode';
        }
    });
});
