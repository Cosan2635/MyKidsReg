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
            changePasswordRequired: false,
            passwordStrength: '' // Tilføjet passwordStrength til data
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
        getPasswordStrengthIndicator(strength) {
            // Returner bredden af styrkebjælken baseret på styrkeniveauet
            if (strength === 'weak') {
                return 25; // svag
            } else if (strength === 'medium') {
                return 50; // middel
            } else if (strength === 'strong') {
                return 100; // stærk
            }
            return 0; // hvis ingen styrke er angivet
        },
        getStrengthText(strength) {
            // Returner teksten til styrkestyrken baseret på styrkeniveauet
            if (strength === 'weak') {
                return 'Svag';
            } else if (strength === 'medium') {
                return 'Middel';
            } else if (strength === 'strong') {
                return 'Stærk';
            }
            return ''; // hvis ingen styrke er angivet
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
                const temporaryPassword = response.data.temporaryPassword;
        
                if (userType === undefined) {
                    console.error('User type is undefined in API response');
                    this.errorMessage = 'Fejl ved login. Kontakt systemadministrator.';
                } else {
                    if (temporaryPassword) {
                        // If temporary password, redirect to change password page
                        window.location.href = '../Login/confirmpassword.html';
                    } else {
                        // Redirect based on user type
                        switch (userType) {
                            case 0: // Super_Admin
                                window.location.href = '../Super_Admin/superadmin.html';
                                break;
                            case 1: // Admin
                                window.location.href = '../Admin/admin.html';
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
                }
            })
            .catch(error => {
                this.errorMessage = 'Fejl ved login. Tjek dine oplysninger og prøv igen.';
                console.error('Login error:', error);
            });
        },
        
        
        changePassword() {
            // Implement password change logic here
            this.$store.dispatch('changePassword')
                .then(() => {
                    // Password changed successfully, redirect user to login page
                    window.location.href = '../Login/confirmpassword.html';
                })
                .catch(error => {
                    console.error('Error changing password:', error);
                    // Handle error
                });
        },
        
        onForgotPassword() {
            console.log('Glemt adgangskode knap trykket');
            // Implementer glemt adgangskode logik her
        
            // Antag at der er en API-endepunkt til at sende nulstillings-e-mailen
            axios.post(FORGOT_PASSWORD_API_URL, {
                username: this.username // eller e-mailadresse, afhængigt af hvad brugeren har angivet
            })
            .then(response => {
                // Håndter succes, f.eks. vis en meddelelse til brugeren om, at en nulstillings-e-mail er blevet sendt
                console.log('Nulstillings-e-mail sendt:', response.data);
                // Redirect brugeren til en bekræftelsesside eller vis en meddelelse om, at nulstillings-e-mailen er blevet sendt
                // window.location.href = 'reset_password_confirmation.html';
            })
            .catch(error => {
                // Håndter fejl, f.eks. vis en fejlmeddelelse til brugeren
                console.error('Fejl ved glemt adgangskode:', error);
                // Vis fejlmeddelelse til brugeren
                // this.errorMessage = 'Fejl ved glemt adgangskode. Prøv igen.';
            });
        }
        
    }
}).$mount("#app");