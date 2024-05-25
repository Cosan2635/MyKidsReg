new Vue({
    el: '#app',
    data: {
        tableTitle: 'Forældre- og Studerenderelationer',
        selectedStudent: {}, // Initialiseret objekt
        selectedParentName: '', // Initialiseret variabel til forældrenes navn
        selectedParentLastName: '', // Initialiseret variabel til forældrenes efternavn
        students: [], // En liste over alle studerende
        users: [] // En liste over alle brugere
    },
    methods: {
        goBack() {
            window.history.back();
        },
        fetchParentRelationDetails(parentRelationId) {
            const url = `http://localhost:5191/api/ParentRelations/${parentRelationId}`;
            axios.get(url)
                .then(response => {
                    console.log('Response from API:', response.data);
                    this.selectedStudent = response.data;
                    console.log('Selected Student:', this.selectedStudent);

                    // Opdater forældrenes navne baseret på deres user_id
                    this.selectedParentName = this.getUsernameById(this.selectedStudent.user_id);
                    this.selectedParentLastName = this.getLastNameById(this.selectedStudent.user_id);
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Fejl ved hentning af forældre-relationoplysninger:', error.response.data);
                        console.error('Status kode:', error.response.status);
                        console.error('Headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Forespørgsel blev lavet men ingen respons modtaget:', error.request);
                    } else {
                        console.error('Error', error.message);
                    }
                });
        },
        getStudentNameById(studentId) {
            const student = this.students.find(student => student.id === studentId);
            return student ? student.name : 'Ukendt studerende';
        },
        getUsernameById(userId) {
            const user = this.users.find(user => user.user_Id === userId);
            return user ? user.name : 'Ukendt bruger';
        },
        getLastNameById(userId) {
            const user = this.users.find(user => user.user_Id === userId);
            return user ? user.last_name : 'Ukendt bruger';
        },
        fetchStudentsAndUsers() {
            // Hent studenter data
            axios.get('http://localhost:5191/api/Students')
                .then(response => {
                    this.students = response.data;
                    console.log('Students fetched successfully:', this.students);
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Fejl ved hentning af studenter:', error.response.data);
                        console.error('Status kode:', error.response.status);
                        console.error('Headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Forespørgsel blev lavet men ingen respons modtaget:', error.request);
                    } else {
                        console.error('Error', error.message);
                    }
                });

            // Hent bruger data
            axios.get('http://localhost:5191/api/Users')
                .then(response => {
                    this.users = response.data;
                    console.log('Users fetched successfully:', this.users);
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Fejl ved hentning af brugere:', error.response.data);
                        console.error('Status kode:', error.response.status);
                        console.error('Headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Forespørgsel blev lavet men ingen respons modtaget:', error.request);
                    } else {
                        console.error('Error', error.message);
                    }
                });
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const parentRelationId = urlParams.get('id');
        if (parentRelationId) {
            console.log('Fetching parent relation details...');
            this.fetchParentRelationDetails(parentRelationId);
        }
        this.fetchStudentsAndUsers(); // Hent studenter og brugere ved initialisering
    }
});
