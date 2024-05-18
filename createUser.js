new Vue({
    el: '#app',
    data: {
        userData: {
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
    methods: {
        createUser: function() {
            axios.post('https://mykidsreg20240518001356.azurewebsites.net/api/bruger', this.userData)
                .then(response => {
                    console.log('API response:', response);
                    if (response.status === 201) {
                        alert('Bruger oprettet succesfuldt!');
                        window.location.href = 'superadmin.html';
                    } else {
                        console.error('Unexpected response status:', response.status);
                        alert('Der opstod en fejl. Prøv igen.');
                    }
                })
                .catch(error => {
                    console.error('Fejl ved oprettelse af bruger:', error);
                    if (error.response) {
                        console.error('Server responded with status code', error.response.status);
                        console.error('Response data:', error.response.data);
                    } else if (error.request) {
                        console.error('No response received:', error.request);
                    } else {
                        console.error('Error setting up request:', error.message);
                    }
                    alert('Der opstod en fejl. Prøv igen.');
                });
        },
        goBack: function() {
            window.location.href = 'superadmin.html'; // Går til superadmin.html
        }
    }
});
