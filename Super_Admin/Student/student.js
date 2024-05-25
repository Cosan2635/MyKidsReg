new Vue({
    el: '#app',
    data: {
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        DEPARTMENT_API_URL: 'http://localhost:5191/api/Department',
        students: [],
        departments: [],
        newStudent: {
            Name: '',
            Last_name: '',
            Birthday: '',
            Department_id: null
        },
        selectedStudentId: null,
        selectedStudent: null,
        updatedStudent: {
            Name: '',
            Last_name: '',
            Birthday: '',
            Department_id: null
        }
    },
    methods: {
        loadStudents() {
            axios.get(this.STUDENT_API_URL)
                .then(response => {
                    // Fjern Department_id fra hvert student-objekt
                    this.students = response.data.map(student => ({
                        Id: student.id,
                        Name: student.name,
                        Last_name: student.last_name,
                        Birthday: student.birthday
                    }));
                })
                .catch(error => {
                    console.error('Error loading students:', error);
                });
        },
        
        loadDepartments() {
            axios.get(this.DEPARTMENT_API_URL)
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Error loading departments:', error);
                });
        },
        createStudent() {
            window.location.href = '../Student/createstudent.html';
        },
        
        deleteStudent(studentId) {
            axios.delete(`${this.STUDENT_API_URL}/${studentId}`)
                .then(response => {
                    console.log('Student deleted:', response.data);
                    this.students = this.students.filter(student => student.Id !== studentId);
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                });
        },
        resetForm() {
            this.newStudent = {
                Name: '',
                Last_name: '',
                Birthday: '',
                Department_id: null
            };
        },
        editStudent(studentId) {
            this.student = {...studentId};
            window.location.href = `../Student/updateStudent.html?id= ${studentId}`;
        },
        
        
        
        getStudentById(studentId) {
            if(studentId != null){
                console.log("Navigating to showstudent.html for student with id:", studentId);
                window.location.href = `../Student/showStudent.html?id=${studentId}`;
            }
            else{
                console.error('Ugyldigt Students-ID.');
            }
        },
        goBack() {
            window.location.href='../superadmin.html';
        }
    },
    mounted() {
        this.loadStudents();
        this.loadDepartments();
    }
});
