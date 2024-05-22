new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Institution',
        institutionId: null,
        institution: {
            name: '',
            address: '',
            zip_Code: '',
            tlf_Number: ''
        }
    },
    methods: {
        updateInstitution() {
            if (this.institutionId) {
                axios.put(`${this.API_URL}/${this.institutionId}`, this.institution)
                    .then(response => {
                        console.log('Institution updated successfully:', response.data);
                        //alert('Institutionen er opdateret successfully.');
                        window.location.href = '../Super_Admin/superadmin.html'; // Retning til superadmin-siden
                    })
                    .catch(error => {
                        console.error('Fejl ved opdatering af institution:', error);
                        alert('Der opstod en fejl ved opdatering af institutionen.');
                    });
            } else {
                this.goBack()
                {
                    window.history.back();
                };
            }
        },
        goBack() {
            window.history.back();
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
