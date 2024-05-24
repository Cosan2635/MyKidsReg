new Vue({
    el: '#app',
    data: {
        ADMIN_RELATION_API_URL: 'http://localhost:5191/api/AdminRelations',
        USER_API_URL: 'http://localhost:5191/api/Users',
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        adminRelation: null,
        users: [],
        institutions: [],
        selectedUser: null,
        selectedInstitution: null
    },
    methods: {
        loadAdminRelation(id) {
            axios.get(`${this.ADMIN_RELATION_API_URL}/${id}`)
                .then(response => {
                    this.adminRelation = response.data;
                    return Promise.all([
                        this.loadUsers(),
                        this.loadInstitutions()
                    ]);
                })
                .then(() => {
                    return Promise.all([
                        this.loadSelectedUser(this.adminRelation.user_Id),
                        this.loadSelectedInstitution(this.adminRelation.institution_Id)
                    ]);
                })
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
                    console.error('Error loading users:', error);
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
        loadSelectedUser(userId) {
            this.selectedUser = this.users.find(user => user.user_Id === userId && user.user_type === "Admin");
        },
        loadSelectedInstitution(institutionId) {
            this.selectedInstitution = this.institutions.find(inst => inst.id === institutionId);
        },
        saveChanges() {
            // Implement logic to save changes to admin relation
        },
        goBack() {
            window.location.href ='../AdminRelations/adminrelations.html';
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            this.loadAdminRelation(id);
        }
    }
});
