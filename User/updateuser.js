new Vue({
    el: '#update-user-form',
    data: {
        userId: 0,
        user: {
            user_Name: '',
            name: '',
            last_name: '',
            address: '',
            zip_code: '',
            email: '',
            tlf_nr: '',
            usertype: null
        }
    },
    mounted() {
        this.userId = new URLSearchParams(window.location.search).get('id');
        console.log('UserId hentet fra URL:', this.userId);
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
                        console.log('Brugerdata hentet fra API:', user);
                        this.user = {
                            user_Name: user.user_Name,
                            name: user.name,
                            last_name: user.last_name,
                            address: user.address,
                            zip_code: user.zip_code,
                            email: user.e_mail,
                            tlf_nr: user.mobil_nr,
                            usertype: user.user_type
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
                user_Id: parseInt(this.userId, 10),
                user_Name: this.user.user_Name,
                name: this.user.name,
                last_name: this.user.last_name,
                address: this.user.address,
                zip_code: parseInt(this.user.zip_code, 10),
                e_mail: this.user.email,
                mobil_nr: parseInt(this.user.tlf_nr, 10),
                usertype: parseInt(this.user.usertype, 10)
            };

            console.log('Data der sendes til API:', JSON.stringify(userData, null, 2));

            axios.put(`http://localhost:5191/api/Users/${this.userId}`, userData)
                .then(response => {
                    alert('Bruger opdateret succesfuldt!');
                    window.location.href = 'superadmin.html';
                })
                .catch(error => {
                    console.error('Fejl ved opdatering af bruger:', error);
                    if (error.response && error.response.data) {
                        console.error('Fejldata fra serveren:', error.response.data);
                        alert('Fejl: ' + JSON.stringify(error.response.data.errors));
                    } else {
                        alert('Der opstod en fejl. Prøv igen.');
                    }
                });
        },
        goBack() {
            window.history.back();
        }
    }
});
