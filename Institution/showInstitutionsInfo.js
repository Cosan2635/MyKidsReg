new Vue({
    el: '#app',
    data: {
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        institution: null
    },
    methods: {
        getInstitutionIdFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id');
        },
        getInstitutionDetails() {
            const institutionId = this.getInstitutionIdFromUrl();
            console.log("Fetching details for institution ID:", institutionId); // Tilføjet log
            if (institutionId) {
                const url = `${this.INSTITUTION_API_URL}/${institutionId}`;
                console.log("Loading institution details from URL:", url); // Tilføjet log
                axios.get(url)
                    .then(response => {
                        console.log("Institution details fetched:", response.data); // Tilføjet log
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
        },
        goBack() {
            console.log("Going back to previous page."); // Tilføjet log
            window.location.href = '../Institutions/institution_dashboard.html'; // Redirect til institutionens dashboard
        }
    },
    mounted() {
        console.log("Component mounted. Fetching institution details...");
        this.getInstitutionDetails();
    }
});
