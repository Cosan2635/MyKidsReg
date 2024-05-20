new Vue({
    el: '#update-user-form',
    data: {
        userId: 0,
        user: {
            username: '',
            name: '',
            last_name: '',
            address: '',
            zip_code: '',
            email: '',
            tlf_nr: '',
            user_type: ''
        }
    },
    mounted() {
        // Få brugerens ID fra URL'en
        this.userId = new URLSearchParams(window.location.search).get('id');
        console.log('UserId hentet fra URL:', this.userId);  // Log userId for debugging
        if (this.userId) {
            this.loadUserData();
        } else {
            console.error('UserId er undefined eller null.');
        }
    },
    methods: {
        loadUserData() {
            if (this.userId) {
                axios.get(`http://localhost:5191/api/Users/${this.userId}`)
                    .then(response => {
                        const user = response.data;
                        console.log('Brugerdata hentet fra API:', user);  // Log brugerdata for debugging
                        this.user = {
                            username: user.user_Name, // Ensure this matches the API response field
                            name: user.name,
                            last_name: user.last_name,
                            address: user.address,
                            zip_code: user.zip_code,
                            email: user.e_mail, // Ensure this matches the API response field
                            tlf_nr: user.mobil_nr, // Ensure this matches the API response field
                            user_type: user.usertype // Ensure this matches the API response field
                        };
                    })
                    .catch(error => {
                        console.error('Fejl ved hentning af brugerdata:', error);
                        alert('Kunne ikke hente brugerdata. Prøv igen.');
                    });
            }
        },
        updateUser() {
            const userData = {
                user_Name: this.user.username,
                name: this.user.name,
                last_name: this.user.last_name,
                address: this.user.address,
                zip_code: this.user.zip_code,
                e_mail: this.user.email,
                mobil_nr: this.user.tlf_nr,
                usertype: this.user.user_type
            };

            axios.put(`http://localhost:5191/api/Users/${this.userId}`, userData)
            .then(response => {
                alert('Bruger opdateret succesfuldt!');
                // Redirect til superadmin.html eller en anden side efter opdatering
                window.location.href = 'superadmin.html';
            })
            .catch(error => {
                console.error('Fejl ved opdatering af bruger:', error);
                alert('Der opstod en fejl. Prøv igen.');
            });
    }
}
});

