new Vue({
    el: '#app',
    data: {
        ADMIN_RELATION_API_URL: 'http://localhost:5191/api/AdminRelations',
        USER_API_URL: 'http://localhost:5191/api/Users',
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        tableTitle: 'Admin Relations',
        adminRelations: [],
        users: [], // Array to store admin users
        institutions: [],
        tableData: [] // Add this line to define tableData
    },
    methods: {
        loadAdminRelations() {
            axios.get(this.ADMIN_RELATION_API_URL)
                .then(response => {
                    this.adminRelations = response.data;
                    return axios.all([this.loadUsers(), this.loadInstitutions()]);
                })
                .catch(error => {
                    console.error('Error loading admin relations:', error);
                });
        },
        loadUsers() {
            axios.get(this.USER_API_URL)
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
                    // Assign institutions data
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
        createAdminRelation() {
            window.location.href = '../AdminRelations/createRelation.html';
        },
        viewAdminRelationDetails(id) {
            const url = `${this.ADMIN_RELATION_API_URL}/${id}`;
            axios.get(url)
                .then(response => {
                    console.log('Admin relation retrieved:', response.data);
                    window.location.href = `../AdminRelations/showRelation.html?id=${id}`;
                })
                .catch(error => {
                    console.error('Error fetching admin relation:', error);
                });
        },
        deleteAdminRelation(id) {
            const url = `${this.ADMIN_RELATION_API_URL}/${id}`;
            axios.delete(url)
                .then(response => {
                    console.log('Admin relation deleted:', response.data);
                    this.loadAdminRelations(); // Refresh admin relations after deletion
                })
                .catch(error => {
                    console.error('Error deleting admin relation:', error);
                });
        },
        editAdminRelation(id) {
            window.location.href = `../AdminRelations/editAdminRelation.html?id=${id}`;
        },
        goBack()
        {
            window.location.href ='../Super_Admin/superadmin.html'
        }
    },
    mounted() {
        this.loadAdminRelations();
    }
});
