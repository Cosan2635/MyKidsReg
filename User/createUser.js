new Vue({
    el: '#app',
    data: {
        userData: {
            user_Id: 0,
            user_Name: '',
            password: 'temporaryPassword', 
            name: '',
            last_name: '',
            address: '',
            zip_code: '',
            e_mail: '',
            mobil_nr: '',
            user_type: '' 
        }
    },
    computed: {
        userTypeInt() {
            const userTypes = {
                'Super-admin': 0,
                'Admin': 1,
                'Pedagogue': 2,
                'Parent': 3
            };
            return userTypes[this.userData.user_type];
        }
    },
    methods: {
        createUser: function() {
            
            const apiUserData = {
                user_Id: this.userData.user_Id,
                user_Name: this.userData.user_Name,
                password: this.userData.password, 
                name: this.userData.name,
                last_name: this.userData.last_name,
                address: this.userData.address,
                zip_code: this.userData.zip_code,
                e_mail: this.userData.e_mail,
                mobil_nr: this.userData.mobil_nr,
                usertype: this.userTypeInt
            };
            
            console.log('Data til afsendelse:', apiUserData);
            axios.post('http://localhost:5191/api/Users', apiUserData)
                .then(response => {
                    console.log('API response:', response);
                    if (response.status === 201) {
                        alert('Bruger oprettet succesfuldt!');
                        window.location.href = 'superadmin.html';
                    } else {
                        console.error('Uventet responsstatus:', response.status);
                        alert('Der opstod en fejl. Prøv igen.');
                    }
                })
                .catch(error => {
                    console.error('Fejl ved oprettelse af bruger:', error);
                    if (error.response) {
                        console.error('Server svarede med statuskode', error.response.status);
                        console.error('Responsdata:', error.response.data);

                        // Log detaljer om valideringsfejl
                        if (error.response.data && error.response.data.errors) {
                            console.error('Valideringsfejl:', error.response.data.errors);
                            alert('Valideringsfejl: ' + JSON.stringify(error.response.data.errors, null, 2));
                        }
                    } else if (error.request) {
                        console.error('Ingen svar modtaget:', error.request);
                    } else {
                        console.error('Fejl ved opsætning af anmodning:', error.message);
                    }
                    alert('Der opstod en fejl. Prøv igen.');
                });
        },
        goBack: function() {
            window.history.back();
        }
    }
});