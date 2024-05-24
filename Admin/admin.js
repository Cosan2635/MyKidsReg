new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Student',
        tableTitle: 'Studerende Sektion',
        tableData: [],
        currentSection: 'student'
    },
    methods: {
        loadTableData(section) {
            if (section === 'student') {
                this.tableTitle = 'Studerende Sektion';
                this.loadStudentData();
            }
        },
        loadStudentData() {
            const url = `${this.API_URL}`;
            axios.get(url)
                .then(response => {
                    this.tableData = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af data:', error);
                });
        },
        createEntity() {
            if (this.currentSection === 'student') {
                window.location.href = '../Admin/CreateStudent/createstudent.html';
            }
        },
        viewDetails(studentId) {
            if (studentId != null) {
                window.location.href = `../Admin/ViewStudentDetails/viewstudentdetails.html?id=${studentId}`;
            } else {
                console.error('Ugyldigt student-ID.');
            }
        },
        editItem(id) {
            if (id) {
                window.location.href = `updateStudent.html?id=${id}`;
            } else {
                console.error('Ugyldigt student-ID.');
            }
        },
        deleteItem(id) {
            const url = `${this.API_URL}/${id}`;
            axios.delete(url)
                .then(response => {
                    this.loadStudentData();
                })
                .catch(error => {
                    console.error('Fejl ved sletning af student:', error);
                });
        },
        assignToDepartment(id) {
            window.location.href = `../Admin/StudentRelation/assignToDepartment.html?id=${id}`;
        }
    },
    mounted() {
        this.loadTableData('student');
    }
});
