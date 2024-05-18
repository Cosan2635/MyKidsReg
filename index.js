const API_URL = "mykidsreg20240518001356.azurewebsites.net/api"; // Korrekt API URL

new Vue({
    data() {
        return {
            username: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
            usernameLabel: 'Indtast dit brugernavn',
            passwordLabel: 'Indtast din adgangskode',
            showPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            errorMessage: '',
            changePasswordRequired: false
        };
    },
    methods: {
        onFocus(field) {
            if (field === 'username') {
                this.usernameLabel = 'Brugernavn:';
            } else if (field === 'password') {
                this.passwordLabel = 'Adgangskode:';
            }
        },
        onBlur(field) {
            if (field === 'username' && this.username === '') {
                this.usernameLabel = 'Indtast dit brugernavn';
            } else if (field === 'password' && this.password === '') {
                this.passwordLabel = 'Indtast din adgangskode';
            }
        },
        togglePasswordVisibility(field) {
            if (field === 'password') {
                this.showPassword = !this.showPassword;
            } else if (field === 'newPassword') {
                this.showNewPassword = !this.showNewPassword;
            } else if (field === 'confirmPassword') {
                this.showConfirmPassword = !this.showConfirmPassword;
            }
        },
        onSubmit(event) {
            event.preventDefault();
            if (this.changePasswordRequired) {
                this.changePassword();
            } else {
                this.login();
            }
        },
        login() {
            console.log('Attempting to login with username:', this.username); // Log for debugging
            axios.post(`${API_URL}/login`, {
                username: this.username,
                password: this.password
            })
            .then(response => {
                if (response.data.role === 'super_admin') {
                    window.location.href = 'super_admin.html';
                } else if (response.data.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    console.error('Invalid role:', response.data.role);
                    this.errorMessage = 'Ugyldig rolle. Kontakt systemadministrator.';
                }
            })
            .catch(error => {
                this.errorMessage = 'Fejl ved login. Tjek dine oplysninger og prøv igen.';
                console.error('Login error:', error);
            });
        },
        changePassword() {
            // Implementer ændring af adgangskode logik her
        },
        onForgotPassword() {
            console.log('Glemt adgangskode knap trykket');
            // Implementer glemt adgangskode logik her
        }
    }
}).$mount("#app");
