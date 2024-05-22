new Vue({
    el: '#app',
    data: {
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        institutions: [],
        currentSection: 'institution'
    },
    methods: {
        loadInstitutions() {
            axios.get(this.INSTITUTION_API_URL)
                .then(response => {
                    this.institutions = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af institutioner:', error);
                });
        },
        createInstitution() {
            window.location.href = 'createInstitution.html';
        },
        viewInstitutionDetails(instId) {
            if (instId != null) {
                console.log('Navigating to showInstitutionsInfo.html for institution with ID:', instId);
                window.location.href = `showInstitutionsInfo.html?id=${instId}`;
            } else {
                console.error('Ugyldigt institutions-ID.');
            }
        },
        editInstitution(inst) {
            this.institution = { ...inst };
            window.location.href = `editInstitution.html?id=${inst.id}`;
        },
        deleteInstitution(id) {
            const url = `${this.INSTITUTION_API_URL}/${id}`;
            console.log('Deleting institution with ID:', id, 'URL:', url);
            axios.delete(url)
                .then(response => {
                    console.log('Institution slettet:', response.data);
                    this.loadInstitutions();
                })
                .catch(error => {
                    console.error('Fejl ved sletning af institution:', error);
                });
        }
    },
    mounted() {
        this.loadInstitutions();
    }
});
