new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        user: []
    },
    methods: {
        getUserIdFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id');
        },
        loadUserDetails() {
            const userId = this.getUserIdFromUrl();
            if (userId) {
                const url = `${this.API_URL}/${userId}`;
                console.log('Loading user details from URL:', url); // Debug log
                axios.get(url)
                    .then(response => {
                        console.log('User details loaded:', response.data); // Debug log
                        this.user = response.data;
                    })
                    .catch(error => {
                        console.error('Fejl ved indlæsning af brugeroplysninger:', error);
                    });
            } else {
                console.error('Ugyldigt bruger-ID fra URL.');
            }
        },
        userTypeToString(userType) {
            switch (userType) {
                case 0:
                    return 'Super_Admin';
                case 1:
                    return 'Admin';
                case 2:
                    return 'Pædagoge';
case 3: 
return 'Forældre';
                default:
                    return 'Ukendt';
            }
        },
        goBack() {
            window.history.back();
        }
    },
    mounted() {
        this.loadUserDetails(); // Indlæs brugeroplysninger som standard
    }
});
