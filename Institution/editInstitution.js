new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Institution',
        institutionId: null,
        institution: {
            name: '',
            address: '',
            zip_code: '',
            tlf_number: ''
        }
    },
    methods: {
        updateInstitution() {
            if (this.institutionId) {
                axios.put(`${this.API_URL}/${this.institutionId}`, this.institution)
                    .then(response => {
                        console.log('Institution updated successfully:', response.data);
                        alert('Institutionen er opdateret successfully.');
                        window.location.href = '../Super_admin/superadmin.html'; // Redirect to the dashboard
                    })
                    .catch(error => {
                        console.error('Fejl ved opdatering af institution:', error);
                        alert('Der opstod en fejl ved opdatering af institutionen.');
                    });
            } else {
                alert('Ingen institution ID angivet.');
            }
        },
        goBack() {
            window.location.href = '../Institutions/institution_dashboard.html'; // Redirect til institutionens dashboard
        },
        getInstitutionDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            this.institutionId = urlParams.get('id');
            if (this.institutionId) {
                axios.get(`${this.API_URL}/${this.institutionId}`)
                    .then(response => {
                        this.institution = response.data;
                    })
                    .catch(error => {
                        console.error('Fejl ved hentning af institutionsoplysninger:', error);
                        alert('Der opstod en fejl ved hentning af institutionsoplysninger.');
                    });
            } else {
                alert('Ingen institution ID angivet.');
                this.goBack();
            }
        }
    },
    mounted() {
        this.getInstitutionDetails();
    }
});
