// index.js
// Opret Vue Router
import VueRouter from 'https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js';

// Opret Vue Router
const router = new VueRouter({
    routes: [
        { path: '/', component: ChangePasswordComponent },
        // Definér andre routes efter behov
    ]
});

// Opret Vuex store
const store = new Vuex.Store({
    state: {
        newPassword: '',
        confirmPassword: '',
        errorMessage: '',
        showNewPassword: false,
        showConfirmPassword: false,
        passwordStrength: ''
    },
    mutations: {
        SET_NEW_PASSWORD(state, newPassword) {
            state.newPassword = newPassword;
        },
        SET_CONFIRM_PASSWORD(state, confirmPassword) {
            state.confirmPassword = confirmPassword;
        },
        SET_ERROR_MESSAGE(state, errorMessage) {
            state.errorMessage = errorMessage;
        },
        SET_SHOW_NEW_PASSWORD(state, showNewPassword) {
            state.showNewPassword = showNewPassword;
        },
        SET_SHOW_CONFIRM_PASSWORD(state, showConfirmPassword) {
            state.showConfirmPassword = showConfirmPassword;
        },
        SET_PASSWORD_STRENGTH(state, passwordStrength) {
            state.passwordStrength = passwordStrength;
        }
    },
    actions: {
        async changePassword({ commit, state }) {
            if (state.newPassword !== state.confirmPassword) {
                commit('SET_ERROR_MESSAGE', 'De nye adgangskoder matcher ikke.');
                return;
            }
            
            try {
                const response = await axios.post('CHANGE_PASSWORD_API_URL', {
                    userId: USER_ID,
                    newPassword: state.newPassword,
                    confirmPassword: state.confirmPassword
                });
                
                console.log('Password changed successfully:', response.data);
                // Redirect user to a success page or perform other actions
                
            } catch (error) {
                console.error('Error changing password:', error);
                commit('SET_ERROR_MESSAGE', 'Fejl ved ændring af adgangskode.');
            }
        }
    }
});

// Opret og monter Vue-appen
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
