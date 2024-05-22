const API_URL = "http://localhost:5191/api/Users/login"; 

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
            console.log('Attempting to login with username:', this.username);
            axios.post(API_URL, {
                username: this.username,
                password: this.password
            })
            .then(response => {
                const userType = response.data.usertype; 
                if (userType === undefined) {
                    console.error('User type is undefined in API response');
                    this.errorMessage = 'Fejl ved login. Kontakt systemadministrator.';
                } else {
                    // Redirect based on user type
                    switch (userType) {
                        case 0: // Super_Admin
                            window.location.href = 'superadmin.html';
                            break;
                        case 1: // Admin
                            window.location.href = 'admin.html';
                            break;
                        case 2: // Padagogue
                            // Handle Padagogue logic
                            break;
                        case 3: // Parent
                            // Handle Parent logic
                            break;
                        default:
                            console.error('Invalid user type:', userType);
                            this.errorMessage = 'Ugyldig brugertype. Kontakt systemadministrator.';
                            break;
                    }
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