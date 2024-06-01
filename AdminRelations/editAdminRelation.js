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
        selectedInstitution: null,
        userTypes: {
            0: 'SuperAdmin',
            1: 'Admin',
            2: 'Pædagoge',
            3: 'Forældre'
        }
    },
    methods: {
        loadAdminRelation(id) {
            axios.get(`${this.ADMIN_RELATION_API_URL}/${id}`)
                .then(response => {
                    this.adminRelation = response.data;
                    console.log('Admin relation loaded:', this.adminRelation);
                    return Promise.all([
                        this.loadUsers(),
                        this.loadInstitutions()
                    ]);
                })
                .then(() => {
                    this.loadSelectedUser(this.adminRelation.user_Id);
                    this.loadSelectedInstitution(this.adminRelation.institution_Id);
                })
                .catch(error => {
                    console.error('Error loading admin relation details:', error);
                });
        },
        
        loadUsers() {
            return axios.get(this.USER_API_URL)
                .then(response => {
                    // Log all users before filtering
                    console.log('All Users loaded:', response.data);
                    // Filter users to only include those with userType Admin (1)
                    this.users = response.data.filter(user => user.user_Id && user.usertype === 1);
                    console.log('Filtered Users (Admins only) loaded:', this.users);
                })
                .catch(error => {
                    console.error('Error loading users:', error);
                });
        },
        
        loadInstitutions() {
            return axios.get(this.INSTITUTION_API_URL)
                .then(response => {
                    this.institutions = response.data;
                    console.log('Institutions loaded:', this.institutions);
                })
                .catch(error => {
                    console.error('Error loading institutions:', error);
                });
        },
        
        loadSelectedUser(userId) {
            this.selectedUser = this.users.find(user => user.user_Id === userId);
            console.log('Selected user:', this.selectedUser);
        },
        
        loadSelectedInstitution(institutionId) {
            this.selectedInstitution = this.institutions.find(inst => inst.id === institutionId);
            console.log('Selected institution:', this.selectedInstitution);
        },
        
        saveChanges() {
            axios.put(`${this.ADMIN_RELATION_API_URL}/${this.adminRelation.id}`, this.adminRelation)
                .then(response => {
                    console.log('Admin relation updated:', response.data);
                    window.location.href=`../AdminRelations/adminrelations.html`;
                })
                .catch(error => {
                    console.error('Error updating admin relation:', error);
                    alert('Failed to update admin relation.');
                });
        },
        
        goBack() {
            window.location.href = '../AdminRelations/adminrelations.html';
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            this.loadAdminRelation(id);
        } else {
            this.loadUsers();
            this.loadInstitutions();
        }
    }
});
