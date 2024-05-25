new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Department',
        institutions: [],
        departmentData: {
            name: '',
            institution_Id: null // Starter med null-værdi
        }
    },
    mounted() {
        // Hent alle institutioner ved indlæsning af siden
        this.fetchInstitutions();
    },
    methods: {
        fetchInstitutions() {
            axios.get('http://localhost:5191/api/Institution')
                .then(response => {
                    this.institutions = response.data;
                    console.log('Institutions fetched:', this.institutions);
                })
                .catch(error => {
                    console.error('Fejl ved hentning af institutioner:', error);
                    alert('Der opstod en fejl ved hentning af institutioner.');
                });
        },
        createDepartment() {
            if (!this.departmentData.institution_Id) {
                alert('Vælg venligst en institution.');
                return;
            }

            this.postDepartment();
        },
        postDepartment() {
            axios.post(this.API_URL, this.departmentData)
                .then(response => {
                    console.log('API response:', response);
                    if (response.status === 200) {
                        
                        window.location.href = '../Department/department.html';
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
