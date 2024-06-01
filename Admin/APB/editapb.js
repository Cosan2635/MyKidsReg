new Vue({
    el: '#app',
    data: {
        APB_RELATION_API_URL: 'http://localhost:5191/api/TeacherRelation',
        USER_API_URL: 'http://localhost:5191/api/Users',
        DEPARTMENT_API_URL: 'http://localhost:5191/api/Department',
        apbRelation: null,
        users: [],
        departments: [],
        selectedUser: null,
        selectedDepartment: null,
        userTypes: {
            0: 'SuperAdmin',
            1: 'Admin',
            2: 'Pædagoge',
            3: 'Forældre'
        }
    },
    methods: {
        loadAPBRelation(id) {
            axios.get(`${this.APB_RELATION_API_URL}/${id}`)
                .then(response => {
                    this.apbRelation = response.data;
                    console.log('APB relation loaded:', this.apbRelation);
                    return Promise.all([
                        this.loadUsers(),
                        this.loadDepartments()
                    ]);
                })
                .then(() => {
                    this.loadSelectedUser(this.apbRelation.userId);
                    this.loadSelectedDepartment(this.apbRelation.departmentId);
                })
                .catch(error => {
                    console.error('Error loading APB relation details:', error);
                });
        },
        
        loadUsers() {
            return axios.get(this.USER_API_URL)
                .then(response => {
                    // Filtrer kun brugere med usertype = Pædagoge (2)
                    this.users = response.data.filter(user => user.usertype === 2);
                    console.log('Users loaded:', this.users);
                })
                .catch(error => {
                    console.error('Error loading users:', error);
                });
        },
        
        loadDepartments() {
            return axios.get(this.DEPARTMENT_API_URL)
                .then(response => {
                    this.departments = response.data;
                    console.log('Departments loaded:', this.departments);
                })
                .catch(error => {
                    console.error('Error loading departments:', error);
                });
        },
        
        loadSelectedUser(userId) {
            this.selectedUser = this.users.find(user => user.user_Id === userId);
            console.log('Selected user:', this.selectedUser);
        },
        
        loadSelectedDepartment(departmentId) {
            this.selectedDepartment = this.departments.find(department => department.id === departmentId);
            console.log('Selected department:', this.selectedDepartment);
        },
        
        saveChanges() {
            axios.put(`${this.APB_RELATION_API_URL}/${this.apbRelation.id}`, this.apbRelation)
                .then(response => {
                    console.log('APB relation updated:', response.data);
                    window.location.href = '../APB/apb.html';
                })
                .catch(error => {
                    console.error('Error updating APB relation:', error);
                    alert('Failed to update APB relation.');
                });
        },
        
        goBack() {
            window.location.href = '../APB/apb.html';
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            this.loadAPBRelation(id);
        } else {
            this.loadUsers();
            this.loadDepartments();
        }
    }
});
