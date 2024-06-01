new Vue({
    el: '#app',
    data: {
        ADMIN_RELATION_API_URL: 'http://localhost:5191/api/AdminRelations',
        USER_API_URL: 'http://localhost:5191/api/Users',
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        users: [], // Array to store admin users
        institutions: [],
        selectedUser: null,
        selectedInstitution: null
    },
    methods: {
        loadUsers() {
            axios.get(this.USER_API_URL)
                .then(response => {
                    // Filtrer brugere efter deres rolle som "Admin" (usertype === 1)
                    this.users = response.data.filter(user => user.usertype === 1);
                })
                .catch(error => {
                    console.error('Fejl ved hentning af brugere:', error);
                });
        },
        loadInstitutions() {
            axios.get(this.INSTITUTION_API_URL)
                .then(response => {
                    this.institutions = response.data; // Load all institutions
                })
                .catch(error => {
                    console.error('Error loading institutions:', error);
                });
        },
        createAdminRelation() {
            if (!this.selectedUser || !this.selectedInstitution) {
                alert("Please select both a user and an institution.");
                return;
            }

            const newRelation = {
                user_Id: this.selectedUser,
                institution_Id: this.selectedInstitution
            };

            axios.post(this.ADMIN_RELATION_API_URL, newRelation)
                .then(response => {
                    console.log('Admin relation created:', response.data);
                    window.location.href = '../AdminRelations/adminrelations.html'; // Redirect to the admin relations list page
                })
                .catch(error => {
                    console.error('Error creating admin relation:', error);
                });
        },
        goBack() {
            window.location.href = '../AdminRelations/adminrelations.html';
        }
    },
    mounted() {
        this.loadUsers();
        this.loadInstitutions();
    }
});
