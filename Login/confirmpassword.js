new Vue({
    data() {
        return {
            newPassword: '',
            confirmPassword: '',
            errorMessage: '',
            showNewPassword: false,
            showConfirmPassword: false,
            passwordStrength: ''
        };
    },
    methods: {
        togglePasswordVisibility(field) {
            if (field === 'newPassword') {
                this.showNewPassword = !this.showNewPassword;
            } else if (field === 'confirmPassword') {
                this.showConfirmPassword = !this.showConfirmPassword;
            }
        },
        onChangePasswordSubmit() {
            if (this.newPassword !== this.confirmPassword) {
                this.errorMessage = 'Adgangskoderne matcher ikke.';
                return;
            }

            // Implementer din logik til at ændre adgangskoden her
            axios.post(CHANGE_PASSWORD_API_URL, {
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            })
            .then(response => {
                // Håndter succes
                console.log('Adgangskode ændret:', response.data);
                // Redirect brugeren til login-siden eller vis en bekræftelsesbesked
                 window.location.href = '../Login/login.html';
            })
            .catch(error => {
                // Håndter fejl
                console.error('Fejl ved ændring af adgangskode:', error);
                // Vis en fejlmeddelelse til brugeren
                this.errorMessage = 'Fejl ved ændring af adgangskode. Prøv igen.';
            });
        },
        getPasswordStrengthIndicator(strength) {
            // Returner bredden af styrkebjælken baseret på styrkeniveauet
            if(strength === 'empty')
                return 10;
           else if (strength === 'weak') {
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
            if(strength === ' empty')
                return 'Tom';
            if (strength === 'weak') {
                return 'Svag';
            } else if (strength === 'medium') {
                return 'Middel';
            } else if (strength === 'strong') {
                return 'Stærk';
            }
            return ''; // hvis ingen styrke er angivet
        }
    },
    watch: {
        newPassword() {
            // Evaluer styrken af den nye adgangskode, når den ændres
            this.evaluatePasswordStrength();
        }
    },
    mounted() {
        // Evaluer styrken af den nye adgangskode, når komponenten er monteret
        this.evaluatePasswordStrength();
    },
    computed: {
        passwordStrengthIndicatorWidth() {
            // Beregn bredden af styrkebjælken baseret på den aktuelle styrke
            return this.getPasswordStrengthIndicator(this.passwordStrength) + '%';
        }
    },
    methods: {
        evaluatePasswordStrength() {
            // Implementer logik til at evaluere styrken af den nye adgangskode her
            // Dette kan omfatte kompleksitetsregler og betingelser
            // I dette eksempel er styrken tilfældigt baseret på længden af adgangskoden
            if(this.newPassword.length <1){
                this.passwordStrength = 'tom';
            }
            if (this.newPassword.length <= 4) {
                this.passwordStrength = 'svag';
            } else if (this.newPassword.length < 6) {
                this.passwordStrength = 'middel';
            } else {
                this.passwordStrength = 'stærk';
            }
        }
    }
}).$mount("#app");
