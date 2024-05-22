new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        STUDENT_API_URL: 'http://localhost:5191/api/Student', // Tilføjet URL til Students API
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
        PARENTS_RELATION_API_URL: 'http://localhost:5191/api/ParentRelations', 
        tableTitle: 'Bruger Sektion',
        tableData: [],
        institutions: [],
        users: [], // Tilføjet til at gemme brugere
        students: [], // Tilføjet til at gemme studerende
        currentSection: 'bruger',
        user_Id: 0,
        institution: {
            id: null,
            name: '',
            address: '',
            zip_Code: null,
            tlf_Number: null
        },
        parentRelation: { 
            id: null,
            user_id: null,
            student_id: null
        }
    },
    methods: {
        loadTableData(entityType) {
            this.currentSection = entityType;
            if (entityType === 'institution') {
                this.loadInstitutions();
                this.tableTitle = 'Institution Sektion';
                return;
            } else if (entityType === 'ParentsRelation') {
                this.loadParentsRelations();
                return;
            } else {
                this.tableTitle = 'Bruger Sektion';
            }

            const url = `${this.API_URL}`;
            console.log('Loading data from URL:', url); 
            axios.get(url)
                .then(response => {
                    console.log('Data loaded:', response.data); 
                    this.tableData = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af data:', error);
                });
        },
        loadInstitutions() {
            axios.get(this.INSTITUTION_API_URL)
                .then(response => {
                    this.institutions = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af institutioner:', error);
                });
        },
        loadParentsRelations() {
            axios.get(this.PARENTS_RELATION_API_URL)
                .then(response => {
                    this.tableData = response.data;
                    this.tableTitle = 'Forældre og Studerende Relationer';
                    this.loadUsers(); // Tilføjet for at hente brugere
                    this.loadStudents(); // Tilføjet for at hente studerende
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af forældre relationer:', error);
                });
        },
        loadUsers() {
            axios.get(this.API_URL)
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
            return user ? user.name  : 'Ukendt bruger';            
        },
        getLastNameById(userId) {
            const user = this.users.find(user => user.user_Id === userId);
            return user ? user.last_name : 'Ukendt bruger';            
        },
        getStudentNameById(studentId) {
            const student = this.students.find(student => student.id === studentId);
            return student ? student.name : 'Ukendt studerende';
        },
        createUser() {
            window.location.href = 'createUser.html';
        },
        createInstitution() {
            window.location.href = 'createInstitution.html';
        },
        viewUserDetails(user_Id) {
            if (user_Id != null) {
                console.log('Navigating to GetById.html for user with ID:', user_Id); 
                window.location.href = `GetById.html?id=${user_Id}`;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
        viewInstitutionDetails(instId) {
            if (instId != null) {
                console.log('Navigating to showInstitutionsInfo.html for institution with ID:', instId);
                window.location.href = `showInstitutionsInfo.html?id=${instId}`;
            } else {
                console.error('Ugyldigt institutions-ID.');
            }
        },
        editItem(id) {
            console.log('Received user ID:', id); 
            if (id) {
                window.location.href = `updateuser.html?id=${id}`;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
        editInstitution(inst) {
            this.institution = { ...inst };
            window.location.href = `editInstitution.html?id=${inst.id}`;
        },
        createParentRelation() {
            window.location.href = 'createParentRelations.html';
        },
        viewParentRelationDetails(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`;
            axios.get(url)
                .then(response => {
                    console.log('Forældre relation hentet:', response.data);
                    // Gør noget med den hentede data
                })
                .catch(error => {
                    console.error('Fejl ved hentning af forældre relation:', error);
                });
        },
        editParentRelation(id) {
            console.log('Received parent relation ID:', id); 
            if (id) {
                window.location.href = `editParentRelation.html?id=${id}`;
            } else {
                console.error('Ugyldigt forældre-relation-ID.');
            }
        },
        deleteItem(id) {
            const url = `${this.API_URL}/${id}`;
            console.log('Deleting user with ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Bruger slettet:', response.data);
                    this.loadTableData('bruger'); 
                })
                .catch(error => {
                    console.error('Fejl ved sletning af bruger:', error);
                });
        },
        deleteInstitution(id) {
            const url = `${this.INSTITUTION_API_URL}/${id}`;
            console.log('Deleting institution with ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Institution slettet:', response.data);
                    this.loadTableData('institution'); 
                })
                .catch(error => {
                    console.error('Fejl ved sletning af institution:', error);
                });
        },
        deleteParentRelation(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`; 
            console.log('Sletning af forældre relation med ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Forældre relation slettet:', response.data);
                    this.loadTableData('ParentsRelation'); 
                })
                .catch(error => {
                    console.error('Fejl ved sletning af forældre relation:', error);
                });
        },
        userTypeToString(userType) {
            switch (userType) {
                case 0:
                    return 'Super_Admin';
                case 1:
                    return 'Admin';
                case 3:
                    return 'Pædagoge';
                default:
                    return 'Forældre';
            }
        }
    },
    mounted() {
        this.loadTableData('bruger'); 
    }
});
