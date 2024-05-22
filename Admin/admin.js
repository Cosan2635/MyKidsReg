new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Student',
        tableTitle: 'Studerende Sektion',
        tableData: []
    },
    methods: {
        loadTableData() {
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
        createStudent() {
            window.location.href = 'createStudent.html'; // Naviger til opret student siden
        },
        viewDetails(studentId) {
            if (studentId != null) {
                console.log('Navigating to GetById.html for student with ID:', studentId);
                window.location.href = `GetById.html?id=${studentId}`;
            } else {
                console.error('Ugyldigt student-ID.');
            }
        },
        editItem(id) {
            console.log('Received student ID:', id);
            if (id) {
                window.location.href = `updateStudent.html?id=${id}`; // Naviger til updateStudent.html med studentens ID som parameter
            } else {
                console.error('Ugyldigt student-ID.');
            }
        },
        deleteItem(id) {
            const url = `${this.API_URL}/${id}`;
            console.log('Deleting student with ID:', id, 'URL:', url);
            axios.delete(url)
                .then(response => {
                    console.log('Student slettet:', response.data);
                    this.loadTableData(); // Opdatér tabeldata efter sletning
                })
                .catch(error => {
                    console.error('Fejl ved sletning af student:', error);
                });
        },
        assignToDepartment(id) {
            console.log('Assigning student with ID:', id, 'to department');
            window.location.href = `assignToDepartment.html?id=${id}`; // Naviger til assignToDepartment.html med studentens ID som parameter
        }
    },
    mounted() {
        this.loadTableData();
    }
});
