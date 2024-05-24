new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Department',
        institutionId: null,
        departmentData: {
            name: '',
            institution_Id: null // Starter med null-værdi
        }
    },
    methods: {
        createDepartment() {
            // Hent institutionens ID fra din backend
            axios.get('http://localhost:5191/api/Institution')
                .then(response => {
                    this.departmentData.institution_Id = response.data.id; // Opdater institution_Id med ID fra backend
                    this.postDepartment(); // Kald funktion til oprettelse af afdeling efter institutionens ID er modtaget
                })
                .catch(error => {
                    console.error('Fejl ved hentning af institutionens ID:', error);
                    alert('Der opstod en fejl ved hentning af institutionens ID.');
                });
        },
        postDepartment() {
            // Udfør oprettelse af afdeling med data inklusive institutionens ID
            axios.post(this.API_URL, this.departmentData)
                .then(response => {
                    console.log('API response:', response);
                    if (response.status === 201) {
                        alert('Afdeling oprettet succesfuldt!');
                        window.location.href = 'admin.html';
                    } else {
                        console.error('Uventet responsstatus:', response.status);
                        alert('Der opstod en fejl. Prøv igen.');
                    }
                })
                .catch(error => {
                    console.error('Fejl ved oprettelse af afdeling:', error);
                    if (error.response) {
                        console.error('Server svarede med statuskode', error.response.status);
                        console.error('Responsdata:', error.response.data);

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
        goBack() {
            window.history.back();
        }
    }
});
