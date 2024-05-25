new Vue({
    el: '#app',
    data: {
        PARENTS_RELATION_API_URL: 'http://localhost:5191/api/ParentRelations',
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        USER_API_URL: 'http://localhost:5191/api/Users',
        tableTitle: 'Forældre- og Studerenderelationer',
        parentRelations: [],
        users: [],
        students: []
    },
    methods: {
        loadParentRelations() {
            axios.get(this.PARENTS_RELATION_API_URL)
                .then(response => {
                    this.parentRelations = response.data;
                    this.loadUsers();
                    this.loadStudents();
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af forældre relationer:', error);
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
        loadStudents() {
            axios.get(this.STUDENT_API_URL)
                .then(response => {
                    this.students = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af studerende:', error);
                });
        },
        getUsernameById(userId) {
            const user = this.users.find(user => user.user_Id === userId);
            return user ? user.name : 'Ukendt bruger';
        },
        getLastNameById(userId) {
            const user = this.users.find(user => user.user_Id === userId);
            return user ? user.last_name : 'Ukendt bruger';
        },
        getStudentNameById(studentId) {
            const student = this.students.find(student => student.id === studentId);
            return student ? student.name : 'Ukendt studerende';
        },
        getAddressById(userId) {
            console.log('Finding user by ID:', userId);
            const user = this.users.find(user => user.user_Id === userId);
            console.log('Found user:', user);
            return user ? user.address : 'Ukendt bruger';
        },
        getZip_CodeById(userId) {
            console.log('Finding user by ID:', userId);
            const user = this.users.find(user => user.user_Id === userId);
            console.log('Found user:', user);
            return user ? user.zip_code : 'Ukendt bruger';
        },
        getE_mailById(userId) {
            console.log('Finding user by ID:', userId);
            const user = this.users.find(user => user.user_Id === userId);
            console.log('Found user:', user);
            return user ? user.e_mail : 'Ukendt bruger';
        },
        getMobilNumberById(userId) {
            console.log('Finding user by ID:', userId);
            const user = this.users.find(user => user.user_Id === userId);
            console.log('Found user:', user);
            return user ? user.mobil_nr : 'Ukendt bruger';
        },
        
        viewParentRelationDetails(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`;
            axios.get(url)
                .then(response => {
                    console.log('Forældre relation hentet:', response.data);
                    window.location.href = `../Parentrelations/showRelationInfo.html?id=${id}`;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af forældre relation:', error);
                });
        },
    
        
        goBack()
        {
window.location.href ='../admin.html'
        }
    },
    mounted() {
        this.loadParentRelations();
    }
});
