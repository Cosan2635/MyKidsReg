new Vue({
    el: '#app',
    data: {
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        institution: {
            name: '',
            address: '',
            zip_code: null,
            tlf_number: null
        }
    },
    methods: {
        createInstitution() {
            axios.post(this.INSTITUTION_API_URL, this.institution)
                .then(response => {
                    console.log('Institution oprettet:', response.data);
                    window.location.href = '../Institution/institution.html'; // Redirect til dashboardet
                })
                .catch(error => {
                    console.error('Fejl ved oprettelse af institution:', error);
                    alert('Der opstod en fejl ved oprettelsen af institutionen. Prøv igen.');
                });
        },
        goBack() {
            window.location.href = '../Institution/institution.html'; // Redirect til institutionens dashboard
        }
    }
});
