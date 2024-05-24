new Vue({
    el: '#app',
    data: {
        ADMIN_RELATION_API_URL: 'http://localhost:5191/api/AdminRelations',
        USER_API_URL: 'http://localhost:5191/api/Users',
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        adminRelation: null,
        adminName: '',
        institutionName: '',
        users: [],
        institutions: [],
        tableTitle: 'Relations Detaljer'
    },
    methods: {
        loadAdminRelationById(id) {
            axios.get(`${this.ADMIN_RELATION_API_URL}/${id}`)
                .then(response => {
                    this.adminRelation = response.data;
                    return axios.all([
                        this.loadUsers(),
                        this.loadInstitutions()
                    ]);
                })
                .then(axios.spread(() => {
                    this.adminName = this.getUsernameById(this.adminRelation.user_Id);
                    this.institutionName = this.getInstitutionNameById(this.adminRelation.institution_Id);
                }))
                .catch(error => {
                    console.error('Error loading admin relation details:', error);
                });
        },
        loadUsers() {
            return axios.get(this.USER_API_URL)
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af brugere:', error);
                });
        },
        loadInstitutions() {
            return axios.get(this.INSTITUTION_API_URL)
                .then(response => {
                    this.institutions = response.data;
                })
                .catch(error => {
                    console.error('Error loading institutions:', error);
                });
        },
        getUsernameById(userId) {
            const user = this.users.find(user => user.user_Id === userId);
            return user ? user.name : 'Unknown User';
        },
        getInstitutionNameById(institutionId) {
            const institution = this.institutions.find(inst => inst.id === institutionId);
            return institution ? institution.name : 'Unknown Institution';
        },
        goBack() {
            window.location.href ='../AdminRelations/adminrelations.html';
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            this.loadAdminRelationById(id);
        }
    }
});
